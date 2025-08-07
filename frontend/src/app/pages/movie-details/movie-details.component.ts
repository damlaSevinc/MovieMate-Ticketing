import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie | null = null;
  movieId = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const id = Number(params['movieId'] ?? 0);
      this.movieId = isFinite(id) && id > 0 ? id : 0;
      this.getMovieDetails();
    })
  }

  getMovieDetails() {
    this.http.get<Movie>(`/movies/${String(this.movieId)}`).subscribe({
      next: (movie: Movie) => this.movie = movie,
      error: (error) => {
        console.error(error);
        this.toast.error({ detail: 'ERROR', summary: 'Failed to fetch movie details.', duration: 4000 });
      }
    })
  }

  getShowtimes() {
    void this.router.navigate(['/showtimes'], { queryParams: { movieId: this.movieId } });
  }
}
