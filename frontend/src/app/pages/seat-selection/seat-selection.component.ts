import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Movie } from 'src/app/models/movie';
import { Seat } from 'src/app/models/seat';
import { Showtime } from 'src/app/models/showtime';

interface Row {
  number: number;
  seats: Seat[];
}
@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {

  movieId = 0;
  showtimeId = 0;
  selectedDate = '';
  rows: Row[] = [];
  movie: Movie | null = null;
  showtime: Showtime | null = null;
  assignedSeats: string[] = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toast: NgToastService
  ) { }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(params => {
      this.movieId = params['movieId'];
      this.showtimeId = params['showtimeId'];
      this.selectedDate = params['selectedDate']
    }
    );
    this.initializeSeats();
    this.getMovieDetails();
    this.getShowtime();
    this.getAvailableSeats();
  }

  getMovieDetails() {
    this.http.get<Movie>(`/movies/${this.movieId}`).subscribe({
      next: (movie: Movie) => this.movie = movie,
      error: (error) => {
        console.error(error);
        this.toast.error({ detail: "ERROR", summary: "Failed to fetch movie details.", duration: 4000 });
      }
    })
  }

  getShowtime() {
    this.http.get<Showtime>(`/movies/${this.movieId}/showtimes/${this.showtimeId}`).subscribe({
      next: (showtime: Showtime) => {
        this.showtime = showtime;
        this.getAvailableSeats();
      },
      error: (error) => {
        console.error(error);
        this.toast.error({ detail: "ERROR", summary: "Failed to fetch showtimes.", duration: 4000 });
      }
    })
  }

  getAvailableSeats() {
    const selectedShowtimeId: number = this.showtimeId
    const selectedDate: string = this.selectedDate;
    this.http.get<Seat[]>(`/seats`, { params: { selectedShowtimeId, selectedDate } }).subscribe({
      next: (assignedSeats: string[]) => this.assignedSeats = assignedSeats,
      error: (error) => {
        console.error(error);
        this.toast.error({ detail: "ERROR", summary: "Failed to fetch assigned seats.", duration: 4000 });
      }
    })
  }

  backToShowtimes() {
    this.router.navigate(['/showtimes'],
      { queryParams: { movieId: this.movieId } })
  }

  closeSeatSelection() {
    this.router.navigate(['/home'])
  }

  initializeSeats() {
    const numRows = 5;
    const numSeatsPerRow = 8;
    const rowLetters = 'ABCDEFGHIJK';

    for (let i = 0; i < numRows; i++) {
      const rowLetter = rowLetters[i];
      const row: Row = { number: i + 1, seats: [] };
      for (let j = 1; j <= numSeatsPerRow; j++) {
        const seatNumber = rowLetter + j;
        row.seats.push({ seatNumber: seatNumber, selected: false, available: true })
      }
      this.rows.push(row);
    }

  }

  toggleSeatSelection(seat: Seat): void {
    if (seat.available) {
      seat.selected = !seat.selected;
      console.log('toggle');

    }
  }

  getSelectedSeatCount(): number {
    let count = 0;
    for (const row of this.rows) {
      for (const seat of row.seats) {
        if (seat.selected) {
          count++;
        }
      }
    }
    return count;
  }

  goToCheckout() {
    const selectedSeats: Seat[] = [];
    for (const row of this.rows) {
      for (const seat of row.seats) {
        if (seat.selected) {
          selectedSeats.push(seat);
        }
      }
    }
    const seatCount: number = selectedSeats.length;
    this.router.navigate(['/checkout'],
      {
        queryParams: {
          movieId: this.movieId,
          showtimeId: this.showtimeId,
          selectedDate: this.selectedDate,
          seatCount: this.getSelectedSeatCount(),
          selectedSeats: selectedSeats.map(seat => seat.seatNumber).join(',')
        }
      })
  }
}
