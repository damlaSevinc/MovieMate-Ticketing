package com.moviemate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moviemate.entities.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

}
