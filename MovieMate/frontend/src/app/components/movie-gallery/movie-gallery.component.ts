import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.scss']
})
export class MovieGalleryComponent {

  activeTab: string = "In Theathers"; // initial active tab

  changeTab(tabName: string){
    this.activeTab = tabName;
  }
}
