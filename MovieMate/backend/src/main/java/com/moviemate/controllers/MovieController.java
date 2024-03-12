package com.moviemate.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.moviemate.entities.Movie;
import com.moviemate.services.MovieService;

@RestController
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/movies")
    @ResponseStatus(HttpStatus.OK)
    public List<Movie> getMovies(){
        return movieService.getAllMovies();
    }
}
