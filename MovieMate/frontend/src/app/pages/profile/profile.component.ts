import { Component, OnInit } from '@angular/core';
import axios, { AxiosHeaders } from 'axios';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loggedInUser: User | null = null;
  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.authService.getLoggedInUserOb().subscribe((User) => {
      this.loggedInUser = User;
      if (this.loggedInUser) {
        axios.get(`/profile/${this.loggedInUser.id}`)
          .then(response => {
            console.log("Profile of the user:", response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    });
  }

}
