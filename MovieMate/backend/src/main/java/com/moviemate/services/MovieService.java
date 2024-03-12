package com.moviemate.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moviemate.entities.Movie;
import com.moviemate.repositories.MovieRepository;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies(){
        List<Movie> allMovies = movieRepository.findAll();
        return allMovies;
    }
}
