import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: NgToastService
  ) { }

  loggedInUser: User | null = null;
  activeTab = 'login';
  firstName = '';
  lastName = '';
  email = '';
  password = '';

  ngOnInit(): void {
    this.authService.getLoggedInUserOb().subscribe((user) => {
      this.loggedInUser = user;
    })
  }

  async handleAuth(
    action: 'login' | 'register',
    payload: Partial<User> | { email: string, password: string }
  ): Promise<void> {
    try {
      const authResponse =
        action === 'login'
          ? payload.email && payload.password
            ? await this.authService.login(payload.email, payload.password)
            : Promise.reject(new Error('Email and password are required'))
          : await this.authService.register(payload as Partial<User>);
      if (authResponse) {
        await this.router.navigate(['/home']);
        this.toast.success({ detail: "SUCCESS", summary: `${action === 'login' ? 'Logged in' : 'Registered'} successfully.`, duration: 4000, position: 'bottomRight' });
      }
    } catch (error) {
      this.handleError(error, action);
    }
  }


  async register(): Promise<void> {
    const userInfo: Partial<User> = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };
    await this.handleAuth('register', userInfo);
  }

  async login(): Promise<void> {
    const loginData = { email: this.email, password: this.password };
    await this.handleAuth('login', loginData);
  }

  private handleError(error: unknown, action: 'login' | 'register'): void {
    console.error(`Error during ${action}:`, error);
    this.toast.error({ detail: 'ERROR', summary: `Failed to ${action}. Please try again.`, duration: 4000, position: 'bottomRight' });
  }


}
