import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  loggedInUser: User | null = null;
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.authService.getLoggedInUserOb().subscribe((User) => {
      this.loggedInUser = User;
    });
  }
  saveNewPassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    axios.put(`/users/${this.loggedInUser!.id}/password`, { newPassword: this.newPassword })
      .then(response => {
        console.log("Password change done");
        this.toast.success({detail:"SUCCESS", summary:'You change your password successfully.', duration:4000})
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
