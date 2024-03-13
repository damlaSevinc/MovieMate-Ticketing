import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.scss']
})
export class MovieGalleryComponent implements OnInit{

  movies: Movie[] = [];
  moviesInTheathers: Movie[] = [];
  moviesUpcoming: Movie[] = [];
  activeTab: string = "In Theathers"; // initial active tab

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
          } else {
            this.moviesUpcoming.push(this.movies[i]);
          }
        }
      })
      .catch(error => {
        console.error('Error: ', error);
      })
  }

}
