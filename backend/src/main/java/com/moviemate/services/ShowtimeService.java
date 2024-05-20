package com.moviemate.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moviemate.entities.Showtime;
import com.moviemate.repositories.ShowtimeRepository;

@Service
public class ShowtimeService {

    @Autowired
    private ShowtimeRepository showtimeRepository;

    public List<Showtime> getShowtimesByMovieId(Long movieId){
        List<Showtime> allShowtimes = showtimeRepository.findByMovieId(movieId);
        return allShowtimes;
    }

    public Optional<Showtime> getShowtimeByShowtimeId(Long showtimeId){
        return showtimeRepository.findById(showtimeId);
    }
}
