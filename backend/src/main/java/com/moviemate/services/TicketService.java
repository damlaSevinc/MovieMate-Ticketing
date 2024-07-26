package com.moviemate.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.moviemate.entities.Seat;
import com.moviemate.entities.Ticket;
import com.moviemate.repositories.SeatRepository;
import com.moviemate.repositories.TicketRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private SeatRepository seatRepository;

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

    @Transactional(readOnly = true)
    public List<Ticket> getTicketsAscByUser(Long userId){
        List<Ticket> userTickets = ticketRepository.findByUserIdOrderByOrderDateAsc(userId);

        Set<Seat> seats = seatRepository.findByTicketsIn(userTickets);

        Map<Long, Set<Seat>> ticketSeatsMap = new HashMap<>();

        for (Seat seat : seats) {
            for (Ticket ticket : seat.getTickets()) {
                Long ticketId = ticket.getId();
                ticketSeatsMap.computeIfAbsent(ticketId, k -> new HashSet<>()).add(seat);
            }
        }

        for (Ticket ticket : userTickets){
            Set<Seat> assignedSeats = ticketSeatsMap.get(ticket.getId());
            ticket.setAssignedSeats(assignedSeats);
        }

        return userTickets;
    }

    @Transactional(readOnly = true)
    public List<Ticket> getTicketsDescByUser(Long userId){
        List<Ticket> userTickets = ticketRepository.findByUserIdOrderByOrderDateDesc(userId);

        Set<Seat> seats = seatRepository.findByTicketsIn(userTickets);

        Map<Long, Set<Seat>> ticketSeatsMap = new HashMap<>();

        for (Seat seat : seats) {
            for (Ticket ticket : seat.getTickets()) {
                Long ticketId = ticket.getId();
                ticketSeatsMap.computeIfAbsent(ticketId, k -> new HashSet<>()).add(seat);
            }
        }

        for (Ticket ticket : userTickets){
            Set<Seat> assignedSeats = ticketSeatsMap.get(ticket.getId());
            ticket.setAssignedSeats(assignedSeats);
        }

        return userTickets;
    }


}
