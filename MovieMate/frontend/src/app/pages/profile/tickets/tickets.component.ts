import { Component } from '@angular/core';
import axios from 'axios';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent {
  loggedInUser: User | null = null;
  userTickets: Ticket[] = [];
  selectedSortingOption: string = 'Newest';
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getLoggedInUserOb().subscribe((User) => {
      this.loggedInUser = User;
      if (this.loggedInUser) {
        axios.get(`/users/${this.loggedInUser.id}`)
          .then(response => {
            console.log("Profile of the user:", response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
        this.getNewestTickets();
      }
    });
  }

  toggleExpand(ticket: Ticket): void {
    ticket.isExpanded = !ticket.isExpanded;
  }

  selectSortingOption(option: string): void {
    this.selectedSortingOption = option;
    if (option == 'Newest'){
      this.getNewestTickets();
    } else {
      this.getOldestTickets();
    }
  }

  getNewestTickets(){
    axios.get(`/users/${this.loggedInUser!.id}/tickets/desc`)
    .then(response =>
      this.userTickets = response.data)
    .catch(error =>
      { console.error(error); })
  }

  getOldestTickets(){
    axios.get(`/users/${this.loggedInUser!.id}/tickets/asc`)
    .then(response =>
      this.userTickets = response.data)
    .catch(error =>
      { console.error(error); })
  }
}
