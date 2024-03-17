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
  movieId: number = 0;
  constructor(
    private router: ActivatedRoute,
    private router2: Router
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.movieId = +params['id'];
      // added + operator to coerce the number type, even if JS mostly converts it to number implicitly
      this.getMovieDetails();
    })
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

  getShowtimes(movieId: number): void{
    this.router2.navigate(['/showtimes', movieId])
  }
}
