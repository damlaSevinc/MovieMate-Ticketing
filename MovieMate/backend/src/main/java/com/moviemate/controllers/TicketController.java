package com.moviemate.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.moviemate.entities.Ticket;
import com.moviemate.services.TicketService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class TicketController {

    private final TicketService ticketService;

    @PostMapping("/tickets")
    @ResponseStatus(HttpStatus.CREATED)
    public Ticket buyTicket(@RequestBody Ticket ticket){
        Ticket createdTicket = ticketService.createTicket(ticket);
        return createdTicket;
    }

    @GetMapping("/users/{userId}/tickets")
    @ResponseStatus(HttpStatus.OK)
    public List<Ticket> getTicket(@PathVariable Long userId){
        // Optional<Ticket> optionalUser
        List<Ticket> userTickets = ticketService.getTicketsByUser(userId);
        return userTickets;
    }
}

