package com.moviemate.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.moviemate.entities.Showtime;
import com.moviemate.services.ShowtimeService;

@RestController
public class ShowtimeController {

    @Autowired
    public ShowtimeService showtimeService;

    @GetMapping("/movies/{id}/showtimes")
    @ResponseStatus(HttpStatus.OK)
    public List<Showtime> getAllShowtimes(@PathVariable Long movieId){
        List<Showtime> showtimes = showtimeService.getShowtimesByMovieId(movieId);
        return showtimes;
    }

    @GetMapping("/movies/{movieId}/showtimes/{showtimeId}")
    @ResponseStatus(HttpStatus.OK)
    public Optional<Showtime> getShowtimeById(@PathVariable Long movieId, @PathVariable Long showtimeId){
        Optional<Showtime> showtime = showtimeService.getShowtimeByShowtimeId(showtimeId);
        return showtime;
    }
}
