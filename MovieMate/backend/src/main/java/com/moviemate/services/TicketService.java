package com.moviemate.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.moviemate.entities.Seat;
import com.moviemate.entities.Ticket;
import com.moviemate.repositories.SeatRepository;
import com.moviemate.repositories.TicketRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final SeatRepository seatRepository;

    public Ticket createTicket(Ticket ticket){
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM d, yyyy", Locale.ENGLISH);

        if ("Today".equals(ticket.getSelectedDate())){
            ticket.setSelectedDate(today.format(DateTimeFormatter.ISO_LOCAL_DATE));
        } else {
            LocalDate selectedDate = LocalDate.parse(ticket.getSelectedDate(), formatter);
            ticket.setSelectedDate(selectedDate.format(DateTimeFormatter.ISO_LOCAL_DATE));
        }
        Set<Seat> seats = new HashSet<>();
        for(Seat seat : ticket.getAssignedSeats()){
            Seat existingSeat = seatRepository.findBySeatNumber(seat.getSeatNumber());
            if (existingSeat != null){
                seats.add(existingSeat);
            }
        }
        ticket.setAssignedSeats(seats);
        return ticketRepository.save(ticket);
    }

    public List<Ticket> getTicketsAscByUser(Long userId){
        List<Ticket> userTickets = ticketRepository.findByUserIdOrderByOrderDateAsc(userId);
        return userTickets;
    }
    public List<Ticket> getTicketsDescByUser(Long userId){
        List<Ticket> userTickets = ticketRepository.findByUserIdOrderByOrderDateDesc(userId);
        return userTickets;
    }


}
