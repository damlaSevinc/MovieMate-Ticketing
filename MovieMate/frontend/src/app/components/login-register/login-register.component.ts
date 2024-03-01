import { Component } from '@angular/core';
import axios from 'axios';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent{

  constructor(){
    axios.defaults.baseURL = 'http://localhost:8080/';
  }
  activeTab: string = 'login';
  user: user = { firstName: '', lastName: '', email: '', password: ''};

  registerUser = () => {
    axios.post('/register', this.user)
    .then(response => {
      console.log('response is: ', response.data);
    })
    .catch(error => {
      console.error('Error: ', error);
    });
  }

  loginUser = () => {
    axios.post('/login', {
      email : this.user.email,
      password : this.user.password
    })
    .then(response => {
      console.log('user logged in successfully')
      console.log('response is: ', response.data);
    })
    .catch(error => {
      console.error("Error is: ", error);
    })
  }

}
