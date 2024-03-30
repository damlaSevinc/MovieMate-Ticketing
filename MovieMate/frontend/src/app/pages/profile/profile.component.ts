import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loggedInUser: User | null = null;
  userTickets: Ticket[] = [];
  constructor(
    private authService: AuthService
  ) { }

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
        axios.get(`/users/${this.loggedInUser.id}/tickets`)
          .then(response =>
            this.userTickets = response.data)
          .catch(error =>
            console.error(error))
      }
    });
  }

}
