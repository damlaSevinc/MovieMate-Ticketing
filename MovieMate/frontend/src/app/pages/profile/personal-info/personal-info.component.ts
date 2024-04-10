import { Component } from '@angular/core';
import axios from 'axios';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent {

  loggedInUser: User | null = null;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getLoggedInUserOb().subscribe((User) => {
      this.loggedInUser = User;
    });
    if (this.loggedInUser) {
      axios.get(`/profile/${this.loggedInUser.id}`)
        .then(response => {
          console.log("Profile of the user:", response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  submitForm() {
    const formData = {
      firstName: this.loggedInUser?.firstName,
      lastName: this.loggedInUser?.lastName,
      email: this.loggedInUser?.email
    }
    console.log("formdata: ", formData);
    axios.put(`/profile/${this.loggedInUser!.id}`, formData)
      .then(response => {
        console.log("put request worked")
      })
      .catch(error => {
      console.error(error);
      })
  }

}

