import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';
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
    private toast: NgToastService
  ) {
    axios.defaults.baseURL = 'http://localhost:8080/';
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
        if (decodedToken.sub === undefined) return null;
        await axios.get(`/users/${decodedToken.sub}`)
          .then(response => {
            if (response.data) {
              this.loggedInUser = response.data as User;
              this.loggedInUserSubject.next(this.loggedInUser);
            } else {
              throw new Error('Unexpected response format');
            }
          })
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
      const response = await axios.post('/register', userInfo);
      const data = response.data as AuthResponse;
      this.setLoggedInUser(data.user);
      this.setToken(data.token);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          this.toast.error({ detail: "ERROR", summary: 'User already exists.', duration: 4000, position: 'bottomRight' });
        } else {
          this.toast.error({ detail: "ERROR", summary: 'An unexpected error occurred.', duration: 4000, position: 'bottomRight' });
        }
      } else {
        this.toast.error({ detail: "ERROR", summary: 'Network error or unexpected issue.', duration: 4000, position: 'bottomRight' });
      }
      return null;
    }
  }

  async login(email: string, password: string): Promise<AuthResponse | null> {
    try {
      const response = await axios.post('/login', { email, password });
      const data = response.data as AuthResponse;
      this.setLoggedInUser(data.user);
      this.setToken(data.token);
      console.log("token:", data.token);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          this.toast.error({ detail: "ERROR", summary: 'Invalid credentials.', duration: 4000, position: 'bottomRight' });
        } else if (error.response?.status === 401) {
          this.toast.error({ detail: "ERROR", summary: 'Unauthorized. Incorrect password.', duration: 4000, position: 'bottomRight' });
        } else {
          this.toast.error({ detail: "ERROR", summary: 'Login failed. Please try again.', duration: 4000, position: 'bottomRight' });
        }
      } else {
        this.toast.error({ detail: "ERROR", summary: 'An unexpected error occurred.', duration: 4000, position: 'bottomRight' });
      }
      return null;
    }
  }
}
