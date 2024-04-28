import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Movie } from 'src/app/models/movie';
import { Showtime } from 'src/app/models/showtime';

interface Seat {
  number: string;
  selected: boolean;
  available: boolean;
}

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

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router
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
  }

  getMovieDetails() {
    axios.get(`/movies/${this.movieId}`)
      .then(response => {
        this.movie = response.data;
      })
      .catch(error => {
        console.error(error);
      })
  }

  getShowtime(){
    axios.get(`/movies/${this.movieId}/showtimes/${this.showtimeId}`)
      .then(response => {
        this.showtime = response.data
      })
      .catch(error =>
        { console.log(error); })
  }

  backToShowtimes() {
    this.router.navigate(['/showtimes'],
    { queryParams: { movieId: this.movieId }})
  }

  closeSeatSelection() {
    this.router.navigate(['/home'])
  }

  initializeSeats(){
    const numRows = 5;
    const numSeatsPerRow = 8;
    const rowLetters = 'ABCDEFGHIJK';

    for (let i = 0; i < numRows; i++){
      const rowLetter = rowLetters[i];
      const row: Row = { number: i + 1, seats: [] };
      for (let j = 1; j <= numSeatsPerRow; j++) {
        const seatNumber = rowLetter + j;
        row.seats.push({ number: seatNumber, selected: false, available: true})
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

  getSelectedSeatCount(): number{
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
    this.router.navigate(['/checkout'],
      {
        queryParams: {
          movieId: this.movieId,
          showtimeId: this.showtimeId,
          selectedDate: this.selectedDate,
          seatCount: this.getSelectedSeatCount()
        }
      })
  }
}
