import { Seat } from "./seat";
import { Showtime } from "./showtime";
import { User } from "./user";

export interface Ticket {
    id?: number;
    orderId?: number;
    user: User;
    showtime: Showtime;
    adultCount: number;
    childCount: number;
    paidAmount: number;
    selectedDate: string;
    orderDate: string;
    isExpanded: boolean;
    assignedSeats: Seat[];
}