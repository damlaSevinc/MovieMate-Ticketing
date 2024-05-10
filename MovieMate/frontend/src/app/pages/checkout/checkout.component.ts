import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { NgToastService } from 'ng-angular-popup';
import { Movie } from 'src/app/models/movie';
import { Seat } from 'src/app/models/seat';
import { Showtime } from 'src/app/models/showtime';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{

  movie: Movie | null = null;
  showtime: Showtime | null = null;
  selectedDate = '';
  movieId = 0;
  showtimeId = 0;
  count = 0;
  adultCount = 0;
  childCount = 0;
  sum = 0;
  loggedInUser: User | null = null;
  orderDate: Date = new Date();
  selectedSeats: Seat[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toast: NgToastService
  ){}

  ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe(params => {
      this.movieId = +params['movieId']
      this.showtimeId = params['showtimeId']
      this.selectedDate = params['selectedDate']
      this.count = params ['seatCount']
      this.selectedSeats = params['selectedSeats'].split(',');
    })
      this.getMovieDetails();
      this.getShowtime();
      this.totalAmount();
      this.authService.getLoggedInUserOb().subscribe((User) => {
        this.loggedInUser = User;})
  }

  backToSeatSelection(){
    this.router.navigate(['/seat-selection'],
    {
      queryParams: {
      movieId: this.movieId,
      showtimeId: this.showtimeId,
      selectedDate: this.selectedDate,
      selectedSeats: this.selectedSeats
    }
    })
  }

  closeShowtimes(){
    this.router.navigate(['/home'])
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
        { console.log(error); })
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

  totalAmount(): void {
    this.sum = this.adultCount*15.99 + this.childCount*11.99
  }

  buyTicket(): void {
    const ticket: Ticket = {
      id: 0, // will be defined on the backend side
      ticketId: 0, // will be defined on the backend side
      user: this.loggedInUser!,
      showtime: this.showtime!,
      adultCount: this.adultCount,
      childCount: this.childCount,
      paidAmount: this.sum,
      selectedDate: this.selectedDate,
      isExpanded: false,
      orderDate: this.orderDate.toISOString(),
      selectedSeats: this.selectedSeats
    }
    axios.post("/tickets", ticket)
      .then(response =>
        { console.log("buy ticket successful");
        this.router.navigate(['/profile/my-tickets']);
        this.toast.success({detail:"SUCCESS", summary:'You bought the ticket successfully.', duration:4000})
      })
      .catch(error =>
        { console.error(error); });
        this.toast.error({detail:"ERROR", summary:'An error occured during payment.', sticky:true})
  }
}
