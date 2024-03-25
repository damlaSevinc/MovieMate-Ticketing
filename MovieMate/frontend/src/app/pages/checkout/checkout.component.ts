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
  adultCount: number = 0;
  childCount: number = 0;
  sum: number = 0;

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
      this.totalAmount();
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

  decrementCount(countType: 'adult' | 'child'): void{
    if(countType === 'adult'){
      if(this.adultCount == 0){
        this.totalAmount();
        return;
      }
      this.adultCount--;
      this.totalAmount();
    } else if (countType === 'child'){
      if(this.childCount === 0){
        return;
      }
      this.childCount--;
      this.totalAmount();
    }
  }

  incrementCount(countType: 'adult' | 'child'): void{
    if(countType === 'adult'){
      this.adultCount++;
      this.totalAmount();
    } else if (countType === 'child'){
      this.childCount++;
      this.totalAmount();
    }
  }

  totalAmount(){
    this.sum = this.adultCount*15.99 + this.childCount*11.99
  }
}
