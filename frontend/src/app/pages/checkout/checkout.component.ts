import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Movie } from 'src/app/models/movie';
import { Seat } from 'src/app/models/seat';
import { Showtime } from 'src/app/models/showtime';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  movie: Movie | null = null;
  showtime: Showtime | null = null;
  selectedDate = '';
  movieId = 0;
  showtimeId = 0;
  count = 0;
  adultCount = 0;
  childCount = 0;
  sum = 0;
  loggedInUser: User | null = null;
  orderDate: Date = new Date();
  assignedSeats: Seat[] = [];
  adultPrice = 15.99;
  childPrice = 11.99;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toast: NgToastService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.movieId = +params['movieId'];
      this.showtimeId = Number(params['showtimeId'] ?? 0);
      this.selectedDate = String(params['selectedDate'] ?? 0);
      this.count = Number(params['seatCount'] ?? 0);
      const selectedSeatsParam: unknown = params['selectedSeats'];
      if (typeof selectedSeatsParam === 'string' && selectedSeatsParam.length > 0) {
        this.assignedSeats = selectedSeatsParam.split(',').map(seatNumber => ({
          seatNumber,
          selected: false,
          available: true
        }));
      } else {
        this.assignedSeats = [];
      }
    })
    this.getMovieDetails();
    this.getShowtime();
    this.totalAmount();
    this.authService.getLoggedInUserOb().subscribe((User) => {
      this.loggedInUser = User;
    })
  }

  backToSeatSelection() {
    void this.router.navigate(['/seat-selection'],
      {
        queryParams: {
          movieId: this.movieId,
          showtimeId: this.showtimeId,
          selectedDate: this.selectedDate,
          selectedSeats: this.assignedSeats
        }
      })
  }

  closeShowtimes() {
    void this.router.navigate(['/home'])
  }

  getMovieDetails() {
    this.http.get<Movie>(`/movies/${String(this.movieId)}`).subscribe({
      next: (movie: Movie) => {
        this.movie = movie
      },
      error: (error) => {
        console.error(error);
        this.toast.error({ detail: 'ERROR', summary: 'Failed to fetch movie.', duration: 4000 });
      }
    })
  }

  getShowtime() {
    this.http.get<Showtime>(`/movies/${String(this.movieId)}/showtimes/${String(this.showtimeId)}`).subscribe({
      next: (showtime: Showtime) => {
        this.showtime = showtime
      },
      error: (error) => {
        console.error(error);
        this.toast.error({ detail: 'ERROR', summary: 'Failed to fetch showtime.', duration: 4000 });
      }
    })
  }

  decrementCount(countType: 'adult' | 'child') {
    if (countType === 'adult') {
      if (this.adultCount == 0) {
        this.totalAmount();
        return;
      }
      this.adultCount--;
      this.totalAmount();
    } else {
      if (this.childCount === 0) {
        return;
      }
      this.childCount--;
      this.totalAmount();
    }
  }

  incrementCount(countType: 'adult' | 'child') {
    if (countType === 'adult') {
      this.adultCount++;
      this.totalAmount();
    } else {
      this.childCount++;
      this.totalAmount();
    }
  }

  totalAmount(): void {
    this.sum = this.adultCount * this.adultPrice + this.childCount * this.childPrice;
  }

  buyTicket(): void {
    if(!this.loggedInUser || !this.showtime) return;
    const ticket: Ticket = {
      user: this.loggedInUser,
      showtime: this.showtime,
      adultCount: this.adultCount,
      childCount: this.childCount,
      paidAmount: this.sum,
      selectedDate: this.selectedDate,
      isExpanded: false,
      orderDate: this.orderDate.toISOString(),
      assignedSeats: this.assignedSeats
    }
    this.http.post("/tickets", ticket).subscribe({
      next: () => {
        console.log("buy ticket successful");
        void this.router.navigate(['/profile/my-tickets']);
        this.toast.success({ detail: "SUCCESS", summary: 'You bought the ticket successfully.', duration: 4000, position: 'bottomRight' })
      },
      error: (error: unknown) => {
        if (typeof error === 'object' && error != null) {
          console.error(error);
        }
        this.toast.error({ detail: "ERROR", summary: 'An error occured during payment.', duration: 4000, position: 'bottomRight' })
      }
    });
  }
}