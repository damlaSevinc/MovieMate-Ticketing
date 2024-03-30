package com.moviemate.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.moviemate.entities.Ticket;
import com.moviemate.repositories.TicketRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;

    public Ticket createTicket(Ticket ticket){
        Ticket savedTicket = ticketRepository.save(ticket);
        return savedTicket;
    }

    public List<Ticket> getTicketsByUser(Long userId){
        List<Ticket> userTickets = ticketRepository.findAllByUserId(userId);
        return userTickets;
    }
}
