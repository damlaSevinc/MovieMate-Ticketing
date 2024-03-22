import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Movie } from 'src/app/models/movie';
import { Showtime } from 'src/app/models/showtime';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{

  movie: Movie | null = null;
  showtime: Showtime | null = null;
  selectedDate: string = '';
  movieId: number = 0;
  showtimeId: number = 0;

  constructor(
    private router: ActivatedRoute,
    private router2: Router
  ){}

  ngOnInit(): void {
      this.router.params.subscribe(params => {
        //// another observable alternative:
        // this.movieId = this.router.params.pipe(map((p)=> p['movieId'])
        //// snapshot alternative is static, so it needs to be reload if any params change
        // this.movieId = this.router.snapshot.params['movieId'];
      this.movieId = +params['movieId']
      this.showtimeId = params['activeShowtimeId']
      this.selectedDate = params['selectedDate']
      });
      this.getShowtime();
      this.getMovieDetails();
  }

  backToShowtimes(){
    this.router2.navigate(['/showtimes', this.movieId])
  }

  closeShowtimes(){
    this.router2.navigate(['/home'])
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

  getShowtime(){
    axios.get(`/movies/${this.movieId}/showtimes/${this.showtimeId}`)
      .then(response => {
        this.showtime = response.data
      })
      .catch(error =>
        console.log(error))
  }
}
