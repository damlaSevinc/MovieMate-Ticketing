import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken: string = '';
  private loggedInUser: User | null = null;

  constructor() {
    this.initializeUserFromToken();
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
    if(token !== null){
      localStorage.setItem(this.authToken, token);
    }
  }

  clearToken(): void {
    localStorage.removeItem(this.authToken)
  }

  async getLoggedInUser(): Promise<User | null>{
    const token = this.getToken();
    if(!this.loggedInUser && token){
      try {
        const decodedToken: any = jwtDecode(token);
        await axios.get('/users/', decodedToken.id)
          .then(response => {
            if(response && response.data) {
              this.loggedInUser = response.data;
              // this.loggedInUserSubject.next(this.loggedInUser);
            } else {
              throw new Error('Unexpected response format');
            }
          })
      } catch (error) {
        console.error(`Failed to decode token: ${error}`);
      }
    }
  return new Promise((resolve, reject) => {
    if(this.loggedInUser) {
      resolve(this.loggedInUser);
    } else {
      reject('No logged in user');
    }
  })
  }

}
