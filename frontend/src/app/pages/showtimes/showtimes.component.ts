import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Movie } from 'src/app/models/movie';
import { Showtime } from 'src/app/models/showtime';

@Component({
  selector: 'app-showtimes',
  templateUrl: './showtimes.component.html',
  styleUrls: ['./showtimes.component.scss']
})
export class ShowtimesComponent implements OnInit {

  showtimes: Showtime[] = [];
  movieId = 0;
  movie: Movie | null = null;
  activeShowtimeId = 1;
  dates: string[] = [];
  selectedDate = 'Today';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params =>
      this.movieId = +params['movieId'])
    this.getShowtimes();
    this.getMovieDetails();
    this.generateDates();
  }

  getShowtimes() {
    this.http.get<Showtime[]>(`/api/movies/${this.movieId}/showtimes`).subscribe({
      next: (showtimes: Showtime[]) => this.showtimes = showtimes,
      error: (error) => {
        console.error(error);
        this.toast.error({ detail: 'ERROR', summary: 'Failed to fetch showtimes.', duration: 4000 });
      }
    })
  }

  getMovieDetails() {
    this.http.get<Movie>(`/api/movies/${this.movieId}`).subscribe({
      next: (movie: Movie) => this.movie = movie,
      error: (error) => {
        console.error(error);
        this.toast.error({ detail: 'ERROR', summary: 'Failed to fetch movie.', duration: 4000 });
      }
    })
  }

  setActiveShowtime(showtimeId: number) {
    this.activeShowtimeId = showtimeId;
  }

  generateDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    for (let i = 0; i < 14; i++) {
      const optionDate = new Date(tomorrow);
      optionDate.setDate(tomorrow.getDate() + i);
      this.dates.push(optionDate.toISOString().split("T")[0]);
    }
  }

  isPastSession(sessionStartTime: string): boolean {
    let fullTime = `${new Date().toDateString()} ${sessionStartTime}`;
    let sessionTime = new Date(fullTime);
    let currentTime = new Date();
    return currentTime > sessionTime;
  }

  backToMovieDetail() {
    this.router.navigate(['/movie-details'],
      { queryParams: { movieId: this.movieId } })
  }

  closeShowtimes() {
    this.router.navigate(['/home'])
  }

  goToSeatSelection() {
    this.router.navigate(['/seat-selection'],
      {
        queryParams: {
          movieId: this.movieId,
          showtimeId: this.activeShowtimeId,
          selectedDate: this.selectedDate
        }
      })
  }
}
