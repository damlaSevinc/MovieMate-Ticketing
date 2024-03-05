import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  ngOnInit(): void {
      this.getUserProfile();
  }

  getUserProfile = () => {
    axios.get('/profile')
      .then(response => {
        console.log("profile of the user: ", response.data)
      })
      .catch(error => {
        console.error('Error: ', error)
      });
  }
}
