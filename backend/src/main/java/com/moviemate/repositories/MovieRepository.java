package com.moviemate.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com.moviemate.entities.Movie;


@Repository
public interface MovieRepository extends JpaRepository<Movie, Long>{

    @NonNull
    List<Movie> findAll();
}
