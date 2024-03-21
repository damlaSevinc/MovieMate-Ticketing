package com.moviemate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moviemate.entities.Showtime;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {

}