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
      })
      .catch(error => {
        console.error('Error: ', error);
      })
  }

}
