import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit{

  constructor(
    private router: Router,
    private authService: AuthService
  ){
    axios.defaults.baseURL = 'http://localhost:8080/';
  }

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

  registerUser = () => {
    axios.post('/register', {
      firstName: this.firstName,
      lastName: this.lastName,
      email : this.email,
      password : this.password
    })
    .then(response => {
      console.log('response is: ', response.data);
    })
    .catch(error => {
      console.error('Error: ', error);
    });
  }

  loginUser = () => {
    axios.post('/login', {
      email : this.email,
      password : this.password
    })
    .then(response => {
      this.authService.setLoggedInUser(response.data);
      this.authService.setToken(response.data.token);
      this.router.navigate(['/profile']);
    })
    .catch(error => {
      console.error("Error is: ", error);
    })
  }

}
