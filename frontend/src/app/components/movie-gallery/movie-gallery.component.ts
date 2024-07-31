import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.scss']
})
export class MovieGalleryComponent implements OnInit{

  constructor(
    private router: Router
  ){}
  movies: Movie[] = [];
  moviesInTheathers: Movie[] = [];
  moviesUpcoming: Movie[] = [];
  activeTab = "In Theathers"; // initial active tab

  ngOnInit(): void {
      this.getMovies();
  }
  changeTab(tabName: string){
    this.activeTab = tabName;
  }

  getMovies = () => {
    axios.get('/movies')
      .then((response) => {
        this.movies = response.data;
        const currentDate = new Date();
        for(let i = 0; i<this.movies.length; i++){
          const movieDate = new Date(this.movies[i].date);
          if(movieDate < currentDate){
            this.moviesInTheathers.push(this.movies[i]);
            this.moviesInTheathers.sort(this.sortMovies).reverse();
          } else {
            this.moviesUpcoming.push(this.movies[i]);
          }
        }
      })
      .catch(error => {
        console.error('Error: ', error);
      })
  }

  getMovieInfo(movieId: number): void {
    this.router.navigate(['/movie-details'],
    { queryParams: { movieId }})
  }

  getShowtimes(movieId: number): void {
    this.router.navigate(['/showtimes'],
    { queryParams: { movieId }})
  }

  sortMovies(movie1: Movie, movie2: Movie) {
    if(movie1.date < movie2.date){
      return -1;
    }
    if(movie1.date > movie2.date){
      return 1;
    }
    return 0;
  }
}
