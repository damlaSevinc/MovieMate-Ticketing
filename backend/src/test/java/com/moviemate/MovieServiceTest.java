package com.moviemate;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.moviemate.services.MovieService;

@ExtendWith(MockitoExtension.class)
public class MovieServiceTest {

    @Mock
    MovieService movieService;

    @Test
    public void testCompare(){
        int value = movieService.testCompare(2, 1);
        Assertions.assertEquals(1, value);
    }
    }


