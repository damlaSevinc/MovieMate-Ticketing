package com.moviemate.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Service;

import com.moviemate.entities.Ticket;
import com.moviemate.repositories.TicketRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;

    public Ticket createTicket(Ticket ticket){
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM d, yyyy", Locale.ENGLISH);

        if ("Today".equals(ticket.getSelectedDate())){
            ticket.setSelectedDate(today.format(DateTimeFormatter.ISO_LOCAL_DATE));
        } else {
            LocalDate selectedDate = LocalDate.parse(ticket.getSelectedDate(), formatter);
            ticket.setSelectedDate(selectedDate.format(DateTimeFormatter.ISO_LOCAL_DATE));
        }
        Ticket savedTicket = ticketRepository.save(ticket);
        return savedTicket;
    }

    public List<Ticket> getTicketsByUser(Long userId){
        List<Ticket> userTickets = ticketRepository.findAllByUserId(userId);
        return userTickets;
    }
}
