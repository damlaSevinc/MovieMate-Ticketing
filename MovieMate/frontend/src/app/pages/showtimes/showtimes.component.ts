import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  movieId = 0;
  movie: Movie | null = null;
  activeShowtimeId = 1;
  dates: string[] = [];
  selectedDate = 'Today';

  constructor(
    private router: ActivatedRoute,
    private router2: Router){}

  ngOnInit(): void {
    this.router.params.subscribe(params =>
      this.movieId = +params['id'])
    this.getShowtimes();
    this.getMovieDetails();
    this.generateDates();
    }

  getShowtimes(){
    axios.get(`/movies/${this.movieId}/showtimes`)
      .then(response => {
        this.showtimes = response.data
      })
      .catch(error =>
        { console.log(error); })
  }

  getMovieDetails(){
    axios.get(`/movies/${this.movieId}`)
      .then(response => {
        this.movie = response.data;
      })
      .catch(error => {
        console.error(error);
      })
  }

  setActiveShowtime(showtimeId: number){
    this.activeShowtimeId = showtimeId;
  }

  generateDates(){
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    for(let i=0; i<14; i++){
      const optionDate = new Date(tomorrow);
      optionDate.setDate(tomorrow.getDate() + i);
      this.dates.push(optionDate.toISOString().split("T")[0]);
    }
  }

  backToMovieDetail(){
    this.router2.navigate(['/movie-details', this.movieId])
  }

  closeShowtimes(){
    this.router2.navigate(['/home'])
  }

  goToCheckout(): void {
    this.router2.navigate(['/checkout',
    this.movieId, this.activeShowtimeId, this.selectedDate]);
  }
}
