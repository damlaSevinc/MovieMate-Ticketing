package com.moviemate.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.moviemate.entities.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findAllByUserId(Long userId);

    List<Ticket> findByUserIdOrderByOrderDateAsc(Long userId);

    List<Ticket> findByUserIdOrderByOrderDateDesc(Long userId);

    List<Ticket> findByShowtimeId(Long showtimeId);

    @Query("SELECT t FROM Ticket t LEFT JOIN FETCH t.assignedSeats WHERE t.selectedDate = :selectedDate")
    List<Ticket> findBySelectedDate(@Param("selectedDate") String selectedDate);

    @Query(value = "SELECT seat_id from ticket_seats WHERE ticket_id = :ticketId", nativeQuery = true)
    List<Long> findSeatsByTicketId(@Param("ticketId") int ticketId);

}
