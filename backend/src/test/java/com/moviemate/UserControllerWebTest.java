package com.moviemate;

import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moviemate.configs.JwtService;
import com.moviemate.controllers.UserController;
import com.moviemate.dtos.LoginCredentialsDto;
import com.moviemate.dtos.SignUpDto;
import com.moviemate.dtos.UserDto;
import com.moviemate.entities.User;
import com.moviemate.mappers.UserMapper;
import com.moviemate.repositories.UserRepository;
import com.moviemate.services.UserService;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
public class UserControllerWebTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private UserMapper userMapper;

    @Test
    public void shouldRegisterUser() throws Exception {
        UserDto userDto = new UserDto(2L, "testRequest", "testRequest", "test@example.com", "testToken");
        SignUpDto signUpDto = new SignUpDto("testResponse", "testResponse", "test@example.com", "test".toCharArray());
        when(userService.register(any(SignUpDto.class))).thenReturn(userDto);
        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signUpDto)))
                .andDo(result -> {
                    String responseBody = result.getResponse().getContentAsString();
                    System.out.println("Response body:" + responseBody);
                })
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.id").value(userDto.getId()))
                .andExpect(jsonPath("$.firstName").value(userDto.getFirstName()));
    }

    @Test
    public void shouldLoginUser() throws Exception {
        LoginCredentialsDto loginCredentialsDto = new LoginCredentialsDto("test@example.com", "test".toCharArray());
        UserDto userDto = new UserDto(2L, "test", "test", "test@example.com", "testToken");
        when(userService.login(any(LoginCredentialsDto.class))).thenReturn(userDto);
        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginCredentialsDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(userDto.getEmail()))
                .andExpect(jsonPath("$.token").value(userDto.getToken()));
    }

    @Test
    public void shouldReturnLoggedInUser() throws Exception {
        Long userId = 2L;
        User user = new User(2L, "test", "test", "test@example.com", "testPass");
        UserDto userDto = new UserDto(2L, "test", "test", "test@example.com", "testToken");
        when(userRepository.findById(any(Long.class))).thenReturn(Optional.of(user));
        when(userMapper.toUserDto(any(User.class))).thenReturn(userDto);
        mockMvc.perform(get("/users/{id}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userDto.getId()))
                .andExpect(jsonPath("$.token").value(userDto.getToken()));
    }

}
