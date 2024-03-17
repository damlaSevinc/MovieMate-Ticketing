package com.moviemate.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.moviemate.entities.Showtime;
import com.moviemate.services.ShowtimeService;

@RestController
public class SessionController {

    @Autowired
    public ShowtimeService showtimeService;

    @GetMapping("/movies/{id}/showtimes")
    @ResponseStatus(HttpStatus.OK)
    public List<Showtime> getAllShowtimes(@PathVariable("id") Long movieId){
        List<Showtime> showtimes = showtimeService.getShowtimesByMovieId(movieId);
        return showtimes;
    }

}
