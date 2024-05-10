import { Seat } from "./seat";
import { Showtime } from "./showtime";
import { User } from "./user";

export interface Ticket {
    id: number;
    ticketId: number;
    user: User;
    showtime: Showtime;
    adultCount: number;
    childCount: number;
    paidAmount: number;
    selectedDate: string;
    orderDate: string;
    isExpanded: boolean;
    selectedSeats: Seat[];
}