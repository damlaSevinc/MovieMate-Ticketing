import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { AuthResponse } from '../models/authResponse';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken = '';
  private loggedInUser: User | null = null;
  private loggedInUserSubject = new BehaviorSubject<User | null>(null);

  constructor(
    private toast: NgToastService,
    private http: HttpClient
  ) {
    void this.initializeUserFromToken();
  }

  private async initializeUserFromToken(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        await this.getLoggedInUser();
      } catch (error) {
        console.error('Error initializing user from token')
      }
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.authToken);
  }

  setToken(token: string | null): void {
    if (token) {
      localStorage.setItem(this.authToken, token);
    } else {
      localStorage.removeItem(this.authToken);
    }
  }

  clearToken(): void {
    localStorage.removeItem(this.authToken);
    this.setLoggedInUser(null);
  }

  async getLoggedInUser(): Promise<User | null> {
    const token = this.getToken();
    if (!this.loggedInUser && token) {
      try {
        const decodedToken = jwtDecode(token);
        if (typeof decodedToken !== 'object' || !('sub' in decodedToken)) return null;
        const user = await firstValueFrom(this.http.get<User>(`/users/${(decodedToken).sub}`));
        this.loggedInUser = user;
        this.loggedInUserSubject.next(this.loggedInUser);
      } catch (error) {
        console.error(`Failed to decode token: ${String(error)}`);
      }
    }
    return this.loggedInUser;
  }

  setLoggedInUser(user: User | null): void {
    this.loggedInUserSubject.next(user);
  }

  getLoggedInUserOb(): Observable<User | null> {
    return this.loggedInUserSubject.asObservable();
  }

  async register(userInfo: Partial<User | null>): Promise<AuthResponse | null> {
    try {
      const data = await firstValueFrom(this.http.post<AuthResponse>('/register', userInfo));
      this.setLoggedInUser(data.user);
      this.setToken(data.token);
      return data;
    } catch (error) {
      return null;
    }
  }

  async login(email: string, password: string): Promise<AuthResponse | null> {
    try {
      const data = await firstValueFrom(this.http.post<AuthResponse>('/login', { email, password }));
      this.setLoggedInUser(data.user);
      this.setToken(data.token);
      return data;
    } catch (error) {
      return null;
    }
  }
}
