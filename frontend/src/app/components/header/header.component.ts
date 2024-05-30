import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedInUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ){}

  ngOnInit(): void {
      this.authService.getLoggedInUserOb().subscribe((user) => {
        this.loggedInUser = user;
      })
  }

  signOut(){
    this.authService.clearToken();
    this.router.navigate(['/home']);
    this.toast.success({detail:"SUCCESS", summary:'You logged out successfully.', duration:4000})
  }
}
