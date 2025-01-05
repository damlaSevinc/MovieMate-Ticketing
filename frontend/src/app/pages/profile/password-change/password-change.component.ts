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
  oldPassword: string = '';
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

  checkPasswordMatch(): boolean {
    if (this.newPassword !== this.confirmPassword) {
      this.toast.warning({ detail: "WARN", summary: 'Passwords do not match', duration: 4000, position: 'bottomRight' })
      return false;
    }
    return true;
  }

  saveNewPassword() {
    if (!this.loggedInUser) {
      this.toast.error({ detail: "ERROR", summary: "User not logged in. Cannot change password.", duration: 4000, position: 'bottomRight' });
      return;
    }
    if (!this.checkPasswordMatch()) {
      return;
    }
    axios.patch(`/users/${this.loggedInUser!.id}/password`, {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    })
      .then(response => {
        console.log("Password change done");
        this.toast.success({ detail: "SUCCESS", summary: "You change your password successfully.", duration: 4000, position: 'bottomRight' })
      })
      .catch(error => {
        console.error('Error:', error);
        if (error.response) {
          this.toast.warning({ detail: "ERROR", summary: error.response.data, duration: 4000, position: 'bottomRight' });
        } else {
          this.toast.error({ detail: "ERROR", summary: "An unexpected error occurred. Please try again.", duration: 4000, position: 'bottomRight' });
        }
      });
  }
}
