package com.moviemate;

import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moviemate.configs.JwtService;
import com.moviemate.controllers.UserController;
import com.moviemate.dtos.LoginCredentialsDto;
import com.moviemate.dtos.PasswordChangeDto;
import com.moviemate.dtos.SignUpDto;
import com.moviemate.dtos.UserDto;
import com.moviemate.dtos.UserUpdateRequestDto;
import com.moviemate.entities.User;
import com.moviemate.exceptions.AppException;
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

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private JwtService jwtService;

    @MockitoBean
    private UserRepository userRepository;

    @MockitoBean
    private UserMapper userMapper;

    @MockitoBean
    private PasswordEncoder passwordEncoder;

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

    @Test
    public void updateUser_ShouldReturnOk_OnSuccess() throws Exception {
        Long userId = 1L;
        UserUpdateRequestDto updateRequest = new UserUpdateRequestDto("testName", "testLastName", "test@example.com");
        User updatedUser = new User();
        when(userService.updateUser(eq(userId), any(UserUpdateRequestDto.class))).thenReturn(updatedUser);
        mockMvc.perform(patch("/users/{id}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(content().string("User updated successfully"));
    }

    @Test
    public void updateUser_ShouldReturnError_OnFailure() throws Exception {
        Long userId = 1L;
        UserUpdateRequestDto updateRequest = new UserUpdateRequestDto("testName", "testLastName", "test@example.com");
        when(userService.updateUser(eq(userId), any(UserUpdateRequestDto.class)))
                .thenThrow(new AppException("There is no such a user", HttpStatus.BAD_REQUEST));
        mockMvc.perform(patch("/users/{id}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("There is no such a user"));
    }

    @Test
    public void changePassword_ShouldReturnOk_OnSuccess() throws Exception {
        Long userId = 2L;
        PasswordChangeDto passwordChangeDto = new PasswordChangeDto("correctOldPassword", "newPassword");
        User existingUser = new User(userId, "test", "testName", "test@example.com",
                passwordEncoder.encode("correctOldPassword"));
        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(passwordEncoder.matches("correctOldPassword", existingUser.getPassword())).thenReturn(true);
        mockMvc.perform(patch("/users/{id}/password", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(passwordChangeDto)))
                .andExpect(status().isOk())
                .andExpect(content().string("Password updated successfully"));
    }

    @Test
    public void changePassword_ShouldReturnBadRequest_WhenUserNotFound() throws Exception {
        Long userId = 2L;
        PasswordChangeDto passwordChangeDto = new PasswordChangeDto("oldPassword", "newPassword");
        doThrow(new AppException("There is no such a user", HttpStatus.BAD_REQUEST))
                .when(userService).changePassword(eq(userId), any(PasswordChangeDto.class));
        mockMvc.perform(patch("/users/{id}/password", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(passwordChangeDto)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("There is no such a user"));
    }

    @Test
    public void changePassword_ShouldReturnUnauthorized_WhenOldPasswordIsIncorrect() throws Exception {
        Long userId = 2L;
        PasswordChangeDto passwordChangeDto = new PasswordChangeDto("wrongOldPassword", "newPassword");
        doThrow(new AppException("Old password is incorrect", HttpStatus.UNAUTHORIZED))
                .when(userService).changePassword(eq(userId), any(PasswordChangeDto.class));
        mockMvc.perform(patch("/users/{id}/password", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(passwordChangeDto)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Old password is incorrect"));
    }
}
