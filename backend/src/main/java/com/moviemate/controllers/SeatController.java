package com.moviemate.controllers;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moviemate.entities.Seat;
import com.moviemate.entities.Ticket;
import com.moviemate.repositories.SeatRepository;
import com.moviemate.repositories.TicketRepository;
import com.moviemate.utils.DateConversionUtil;

@RestController
@RequestMapping("/api")
public class SeatController {

    @Autowired
    private SeatRepository seatRepository;
    @Autowired
    private TicketRepository ticketRepository;

    @GetMapping("/seats")
    public List<String> getAssignedSeatsForSelectedShowtime(
        @RequestParam Long selectedShowtimeId,
        @RequestParam String selectedDate) {
            String formattedDate = DateConversionUtil.convertDate(selectedDate);
            List<Ticket> ticketsSelectedDate = ticketRepository.findBySelectedDate(formattedDate);
            List<String> allAssignedSeats = new ArrayList<>();
            for(Ticket ticket : ticketsSelectedDate) {
                List<Seat> seats = seatRepository.findByTicketsId(ticket.getId());
                for(Seat seat : seats) {
                    allAssignedSeats.add(seat.getSeatNumber());
                }
            }
            return List.copyOf(allAssignedSeats);
    }
}
