package com.moviemate.controllers;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moviemate.entities.Seat;
import com.moviemate.entities.Ticket;
import com.moviemate.repositories.SeatRepository;
import com.moviemate.repositories.TicketRepository;
import com.moviemate.utils.DateConversionUtil;

@RestController
public class SeatController {

    @Autowired
    private SeatRepository seatRepository;
    @Autowired
    private TicketRepository ticketRepository;

    // Get all assigned seat numbers for the selected showtime
    @GetMapping("/seats")
    public List<String> getAssignedSeatsForSelectedShowtime(
        @RequestParam Long selectedShowtimeId,
        @RequestParam String selectedDate) {
            String formattedDate = DateConversionUtil.convertDate(selectedDate);

            // Get all tickets for the selected date
            List<Ticket> ticketsSelectedDate = ticketRepository.findBySelectedDate(formattedDate);

            // Create a list to store all assigned seats
            List<String> allAssignedSeats = new ArrayList<>();

            // Iterate through all tickets for the selected date
            for(Ticket ticket : ticketsSelectedDate) {
                List<Seat> seats = seatRepository.findByTicketsId(ticket.getId());
                for(Seat seat : seats) {
                    allAssignedSeats.add(seat.getSeatNumber());
                }
            }
            return List.copyOf(allAssignedSeats);
    }
}
