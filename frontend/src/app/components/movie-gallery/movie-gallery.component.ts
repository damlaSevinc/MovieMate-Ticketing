import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/app/models/movie';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.scss']
})
export class MovieGalleryComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private toast: NgToastService
  ) { }

  movies: Movie[] = [];
  moviesInTheathers: Movie[] = [];
  moviesUpcoming: Movie[] = [];
  activeTab = "In Theathers";

  ngOnInit(): void {
    this.getMovies();
  }

  changeTab(tabName: string) {
    this.activeTab = tabName;
  }

  getMovies() {
    this.http.get<Movie[]>('/movies').subscribe({
      next: (movies) => {
        this.movies = movies;
        const currentDate = new Date();
        for (const movie of this.movies) {
          const movieDate = new Date(movie.date);
          if (movieDate < currentDate) {
            this.moviesInTheathers.push(movie);
            this.moviesInTheathers.sort(this.sortMovies).reverse();
          } else {
            this.moviesUpcoming.push(movie);
          }
        }
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
  }

  async getMovieInfo(movieId: number): Promise<void> {
    const success = await this.router.navigate(['/movie-details'], { queryParams: { movieId } })
    if (!success) {
      this.toast.error({ detail: 'ERROR', summary: 'Failed to navigate to movie info.', duration: 4000 });
    }
  }

  async getShowtimes(movieId: number): Promise<void> {
    const success = await this.router.navigate(['/showtimes'], { queryParams: { movieId } })
    if (!success) {
      this.toast.error({ detail: 'ERROR', summary: 'Failed to navigate to showtimes.', duration: 4000 });
    }
  }

  sortMovies = (movie1: Movie, movie2: Movie): number => {
    if (movie1.date < movie2.date) {
      return -1;
    }
    if (movie1.date > movie2.date) {
      return 1;
    }
    return 0;
  }
}
