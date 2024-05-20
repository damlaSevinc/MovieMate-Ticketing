import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.movieId = +params['movieId'];
      // added + operator to coerce the number type, even if JS mostly converts it to number implicitly
      this.getMovieDetails();
    })
  }

  getMovieDetails(): void {
    axios.get(`/movies/${this.movieId}`)
      .then(response => {
        this.movie = response.data;
      })
      .catch(error => {
        console.error(error);
      })
  }

  getShowtimes(): void {
    this.router.navigate(['/showtimes'],
    { queryParams: { movieId: this.movieId }})
  }
}
