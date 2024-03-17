import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Movie } from 'src/app/models/movie';
import { Showtime } from 'src/app/models/showtime';
@Component({
  selector: 'app-showtimes',
  templateUrl: './showtimes.component.html',
  styleUrls: ['./showtimes.component.scss']
})
export class ShowtimesComponent implements OnInit {

  showtimes: Showtime[] = [];
  movieId: number = 0;
  movie: Movie | null = null;
  activeIndex: number = 0;

  constructor(
    private router: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.router.params.subscribe(params =>
      this.movieId = +params['id'])
      this.getShowtimes();
      this.getMovieDetails();
  }

  getShowtimes(){
    axios.get(`/movies/${this.movieId}/showtimes`)
      .then(response => {
        this.showtimes = response.data
        console.log("showtimes: ", this.showtimes);
      })
      .catch(error =>
        console.log(error))
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

  setActiveIndex(index: number){
    this.activeIndex = index;
  }
}
