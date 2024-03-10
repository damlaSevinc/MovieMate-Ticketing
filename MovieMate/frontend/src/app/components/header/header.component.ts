import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loggedInUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.authService.getLoggedInUserOb().subscribe((user) => {
        this.loggedInUser = user;
      })
  }

  signOut(){
    this.authService.clearToken();
    this.router.navigate(['/home']);
  }
}
