import { Component, Input, OnInit } from '@angular/core';
import axios from 'axios';
import { Seat } from 'src/app/models/seat';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  @Input() loggedInUser: User | null = null;

  userTickets: Ticket[] = [];
  selectedSortingOption: string = 'Newest';
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getLoggedInUserOb().subscribe((User) => {
      this.loggedInUser = User;
      this.getNewestTickets();
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
      this.userTickets = response.data.map((ticket: Ticket) => {
        ticket.assignedSeats = this.sortSeats(ticket.assignedSeats);
        return ticket;
      }))
    .catch(error =>
      { console.error(error); })
  }

  getOldestTickets(){
    axios.get(`/users/${this.loggedInUser!.id}/tickets/asc`)
    .then(response =>
      this.userTickets = response.data.map((ticket: Ticket) => {
        ticket.assignedSeats = this.sortSeats(ticket.assignedSeats);
        return ticket;
      }))
    .catch(error =>
      { console.error(error); })
  }

  sortSeats(seats: Seat[]): Seat[] {
    if (!Array.isArray(seats)) {
      return [];
    }
    return seats.sort((a, b) => a.seatNumber.localeCompare(b.seatNumber));
  }

  getSeatNumbers(seats: Seat[]): string {
    if (!Array.isArray(seats)) {
      return '';
    }
    return seats.map(seat => seat.seatNumber).join(', ');
  }
}
