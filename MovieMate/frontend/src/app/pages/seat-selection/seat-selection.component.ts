import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {

  movieId = 0;
  showtimeId = 0;
  selectedDate = '';

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
  }

  backToShowtimes() {
    this.router.navigate(['/showtimes'],
    { queryParams: { movieId: this.movieId }})
  }

  closeSeatSelection() {
    this.router.navigate(['/home'])
  }

  goToCheckout() {
    this.router.navigate(['/checkout'],
      {
        queryParams: {
          movieId: this.movieId,
          showtimeId: this.showtimeId,
          selectedDate: this.selectedDate
        }
      })
  }
}
