import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { ShowtimesComponent } from './pages/showtimes/showtimes.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { TicketsComponent } from './pages/profile/tickets/tickets.component';
import { PersonalInfoComponent } from './pages/profile/personal-info/personal-info.component';
import { PasswordChangeComponent } from './pages/profile/password-change/password-change.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  { path: 'showtimes/:id', component: ShowtimesComponent },
  { path: 'checkout/:movieId/:activeShowtimeId/:selectedDate', component: CheckoutComponent },
  {
    path: 'profile', component: ProfileComponent,
    children: [
      { path: 'personal-info', component: PersonalInfoComponent },
      { path: 'my-tickets', component: TicketsComponent },
      { path: 'password-change', component: PasswordChangeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
