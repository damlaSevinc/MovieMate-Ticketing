import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loggedInUser: User | null = null;
  isPersonalInfo = false;
  isMyTickets = false;
  isPasswordChange = false;
  isDataLoaded = false;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getLoggedInUserOb().subscribe((User) => {
      this.loggedInUser = User;
      this.isDataLoaded = true;
      this.updateFlagsBasedOnRoute();
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateFlagsBasedOnRoute();
      }
    });
  }

  updateFlagsBasedOnRoute(): void {
    if (this.isDataLoaded) {
      const currentRoute = this.route.firstChild?.snapshot.routeConfig?.path;
      this.isPersonalInfo = currentRoute === 'personal-info';
      this.isMyTickets = currentRoute === 'my-tickets';
      this.isPasswordChange = currentRoute === 'password-change';
    }
  }
}
