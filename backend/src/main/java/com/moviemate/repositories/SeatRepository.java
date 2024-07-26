package com.moviemate.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moviemate.entities.Seat;
import com.moviemate.entities.Ticket;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long>{

    Seat findBySeatNumber(String seatNumber);

    Set<Seat> findByTicketsIn(List<Ticket> userTickets);

}
