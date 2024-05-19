package com.moviemate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moviemate.entities.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long>{

    Seat findBySeatNumber(String seatNumber);

}
