import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MovieGalleryComponent } from './components/movie-gallery/movie-gallery.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { ShowtimesComponent } from './pages/showtimes/showtimes.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { TicketsComponent } from './pages/profile/tickets/tickets.component';
import { PersonalInfoComponent } from './pages/profile/personal-info/personal-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgToastModule } from 'ng-angular-popup';
import { PasswordChangeComponent } from './pages/profile/password-change/password-change.component';
import { SeatSelectionComponent } from './pages/seat-selection/seat-selection.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MovieGalleryComponent,
    FooterComponent,
    LoginRegisterComponent,
    ProfileComponent,
    MovieDetailsComponent,
    ShowtimesComponent,
    CheckoutComponent,
    TicketsComponent,
    PersonalInfoComponent,
    PasswordChangeComponent,
    SeatSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    NgToastModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
