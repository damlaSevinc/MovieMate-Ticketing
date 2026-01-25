package com.moviemate;

import java.util.List;
import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.hasSize;

import com.moviemate.controllers.MovieController;
import com.moviemate.entities.Movie;
import com.moviemate.services.MovieService;

@WebMvcTest(MovieController.class)
@AutoConfigureMockMvc(addFilters = false)
public class MovieControllerWebTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private MovieService movieService;

    @Test
    public void moviesShouldReturnAllMovies() throws Exception {
        List<Movie> movies = Arrays.asList(new Movie(), new Movie());
        when(movieService.getAllMovies()).thenReturn(movies);
        mockMvc.perform(get("/api/movies")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void moviesShouldReturnMovieById() throws Exception {
        Movie movie = new Movie();
        movie.setId(2L);
        when(movieService.getMovieDetailsById(movie.getId())).thenReturn(movie);
        mockMvc.perform(get("/api/movies/{id}", movie.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(movie.getId()));

    }
}
