import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
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
  selectedSortingOption = 'Newest';
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private toast: NgToastService
  ) { }

  ngOnInit() {
    this.authService.getLoggedInUserOb().subscribe((User) => {
      this.loggedInUser = User;
      this.getNewestTickets();
    });
  }

  toggleExpand(ticket: Ticket) {
    ticket.isExpanded = !ticket.isExpanded;
  }

  selectSortingOption(option: string) {
    this.selectedSortingOption = option;
    if (option == 'Newest') {
      this.getNewestTickets();
    } else {
      this.getOldestTickets();
    }
  }

  getNewestTickets() {
    if (!this.loggedInUser) return;
    this.http.get<Ticket[]>(`/users/${String(this.loggedInUser.id)}/tickets/desc`).subscribe({
      next: (tickets: Ticket[]) => {
        this.userTickets = tickets.map(ticket => ({
          ...ticket,
          assignedSeats: this.sortSeats(ticket.assignedSeats)
        }));
      },
      error: (error) => {
        console.error(error);
        this.toast.error({ detail: 'ERROR', summary: 'Failed to fetch newest tickets.', duration: 4000 });
      }
    })
  }

  getOldestTickets() {
    if (!this.loggedInUser) return;
    this.http.get<Ticket[]>(`/users/${String(this.loggedInUser.id)}/tickets/asc`).subscribe({
      next: (tickets: Ticket[]) => {
        this.userTickets = tickets.map(ticket => ({
          ...ticket,
          assignedSeats: this.sortSeats(ticket.assignedSeats)
        }));
      },
      error: (error) => {
        console.error(error);
        this.toast.error({ detail: 'ERROR', summary: 'Failed to fetch oldest tickets.', duration: 4000 });
      }
    })
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
