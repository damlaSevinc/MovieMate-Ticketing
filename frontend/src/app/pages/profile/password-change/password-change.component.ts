import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    private http: HttpClient,
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

    this.http.patch<void>(`/api/users/${this.loggedInUser.id}/password`, { oldPassword: this.oldPassword, newPassword: this.newPassword }).subscribe({
      next: () => {
        this.toast.success({ detail: "SUCCESS", summary: "You change your password successfully.", duration: 4000, position: 'bottomRight' })
      },
      error: (error) => {
        console.error(error);
        if (error.error) {
          this.toast.warning({ detail: "ERROR", summary: error.error, duration: 4000, position: 'bottomRight' });
        }
        this.toast.error({ detail: "ERROR", summary: "An unexpected error occurred. Please try again.", duration: 4000, position: 'bottomRight' });
      }
    })
  }
}
