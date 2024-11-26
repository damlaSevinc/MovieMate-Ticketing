package com.moviemate.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.moviemate.entities.Movie;
import com.moviemate.exceptions.AppException;
import com.moviemate.repositories.MovieRepository;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies(){
        List<Movie> allMovies = movieRepository.findAll();
        return allMovies;
    }

    public Movie getMovieDetailsById(Long movieId){
        Optional<Movie> oMovie = movieRepository.findById(movieId);
        if(oMovie.isPresent()){
            Movie movie = oMovie.get();
            return movie;
        }
        throw new AppException("movie doesn't exist", HttpStatus.BAD_REQUEST);
    }

    public int testCompare(int v1, int v2){
        if(v1> v2) return 1;
        return -1;
    }
}
