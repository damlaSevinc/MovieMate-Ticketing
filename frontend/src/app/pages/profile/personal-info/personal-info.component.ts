import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  @Input() loggedInUser: User | null = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private toast: NgToastService
  ) { }

  ngOnInit() {
    this.authService.getLoggedInUserOb().subscribe((User) => {
      this.loggedInUser = User;
    });
  }

  submitForm() {
    if (!this.loggedInUser) return;
    const formData = {
      firstName: this.loggedInUser.firstName,
      lastName: this.loggedInUser.lastName,
      email: this.loggedInUser.email
    }
    this.http.patch<void>(`/api/users/${this.loggedInUser.id}`, formData).subscribe({
      next: () => {
        this.toast.success({ detail: "SUCCESS", summary: 'You edited your info successfully.', duration: 4000, position: 'bottomRight' })
      },
      error: (error) => {
        console.error(error);
        this.toast.error({ detail: "ERROR", summary: 'An error occured during edit.', duration: 4000, position: 'bottomRight' })
      }
    })
  }

}

