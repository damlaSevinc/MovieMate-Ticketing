import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    console.log('movieId: ' + this.movieId);
    console.log('showtimeId: ' + this.showtimeId);
    console.log('selectedDate: ' + this.selectedDate);
    this.initializeSeats();
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
    const numSeatsPerRow = 10;

    for (let i = 0; i < numRows; i++){
      const row: Row = { number: i, seats: [] };
      for (let j = 0; j < numSeatsPerRow; j++) {
        row.seats.push({ number: `${j}`, selected: false, available: true})
      }
      this.rows.push(row);
    }

  }

  toggleSeatSelection(seat: Seat): void {
    if (seat.available) {
      seat.selected = !seat.selected;
    }
  }

  goToCheckout() {
    this.router.navigate(['/checkout'],
      {
        queryParams: {
          movieId: this.movieId,
          showtimeId: this.showtimeId,
          selectedDate: this.selectedDate,
        }
      })
  }
}
