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
import com.moviemate.dtos.AuthResponse;
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
                SignUpDto signUpDto = new SignUpDto("testFirst", "testLast", "test@example.com", "test".toCharArray());
                UserDto userDto = new UserDto(2L, "testFirst", "testLast", "test@example.com");
                AuthResponse authResponse = AuthResponse.builder()
                                .token("testToken")
                                .user(userDto)
                                .build();

                when(userService.register(any(SignUpDto.class))).thenReturn(authResponse);

                mockMvc.perform(post("/api/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(signUpDto)))
                                .andExpect(status().isCreated())
                                .andExpect(jsonPath("$.token").value("testToken"))
                                .andExpect(jsonPath("$.user.id").value(2L));
        }

        @Test
        public void shouldLoginUser() throws Exception {
                LoginCredentialsDto loginCredentialsDto = new LoginCredentialsDto("test@example.com",
                                "test".toCharArray());
                UserDto userDto = new UserDto(2L, "test", "test", "test@example.com");
                AuthResponse authResponse = AuthResponse.builder()
                                .token("testToken")
                                .user(userDto)
                                .build();

                when(userService.login(any(LoginCredentialsDto.class))).thenReturn(authResponse);

                mockMvc.perform(post("/api/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(loginCredentialsDto)))
                                .andDo(result -> {
                                        String responseBody = result.getResponse().getContentAsString();
                                        System.out.println("Response body: " + responseBody);
                                })
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.token").value("testToken"))
                                .andExpect(jsonPath("$.user.email").value("test@example.com"));
        }

        @Test
        public void shouldReturnLoggedInUser() throws Exception {
                Long userId = 2L;
                UserDto userDto = new UserDto(2L, "test", "test", "test@example.com");

                when(userService.getUserById(userId)).thenReturn(userDto);

                mockMvc.perform(get("/api/users/{id}", userId))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.id").value(userDto.getId()));
        }

        @Test
        public void updateUser_ShouldReturnOk_OnSuccess() throws Exception {
                Long userId = 1L;
                UserUpdateRequestDto updateRequest = new UserUpdateRequestDto("testName", "testLastName",
                                "test@example.com");
                User updatedUser = new User();

                when(userService.updateUser(eq(userId), any(UserUpdateRequestDto.class))).thenReturn(updatedUser);

                mockMvc.perform(patch("/api/users/{id}", userId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(updateRequest)))
                                .andExpect(status().isOk())
                                .andExpect(content().string("User updated successfully"));
        }

        @Test
        public void updateUser_ShouldReturnError_OnFailure() throws Exception {
                Long userId = 1L;
                UserUpdateRequestDto updateRequest = new UserUpdateRequestDto("testName", "testLastName",
                                "test@example.com");

                when(userService.updateUser(eq(userId), any(UserUpdateRequestDto.class)))
                                .thenThrow(new AppException("User not found", HttpStatus.BAD_REQUEST));

                mockMvc.perform(patch("/api/users/{id}", userId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(updateRequest)))
                                .andExpect(status().isBadRequest())
                                .andExpect(jsonPath("$.httpStatus").value(400))
                                .andExpect(jsonPath("$.message").value("User not found"))
                                .andExpect(jsonPath("$.timestamp").exists());
        }

        @Test
        public void changePassword_ShouldReturnOk_OnSuccess() throws Exception {
                Long userId = 2L;
                PasswordChangeDto passwordChangeDto = new PasswordChangeDto("correctOldPassword", "newPassword");
                User existingUser = new User(userId, "test", "testName", "test@example.com",
                                passwordEncoder.encode("correctOldPassword"));

                when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
                when(passwordEncoder.matches("correctOldPassword", existingUser.getPassword())).thenReturn(true);

                mockMvc.perform(patch("/api/users/{id}/password", userId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(passwordChangeDto)))
                                .andExpect(status().isOk())
                                .andExpect(content().string("Password updated successfully"));
        }

        @Test
        public void changePassword_ShouldReturnBadRequest_WhenUserNotFound() throws Exception {
                Long userId = 2L;
                PasswordChangeDto passwordChangeDto = new PasswordChangeDto("oldPassword", "newPassword");

                doThrow(new AppException("User not found", HttpStatus.BAD_REQUEST))
                                .when(userService).changePassword(eq(userId), any(PasswordChangeDto.class));

                mockMvc.perform(patch("/api/users/{id}/password", userId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(passwordChangeDto)))
                                .andExpect(status().isBadRequest())
                                .andExpect(jsonPath("$.message").value("User not found"))
                                .andExpect(jsonPath("$.httpStatus").value(400))
                                .andExpect(jsonPath("$.timestamp").exists());
        }

        @Test
        public void changePassword_ShouldReturnUnauthorized_WhenOldPasswordIsIncorrect() throws Exception {
                Long userId = 2L;
                PasswordChangeDto passwordChangeDto = new PasswordChangeDto("wrongOldPassword", "newPassword");

                doThrow(new AppException("Old password is incorrect", HttpStatus.UNAUTHORIZED))
                                .when(userService).changePassword(eq(userId), any(PasswordChangeDto.class));

                mockMvc.perform(patch("/api/users/{id}/password", userId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(passwordChangeDto)))
                                .andExpect(status().isUnauthorized())
                                .andExpect(jsonPath("$.message").value("Old password is incorrect"))
                                .andExpect(jsonPath("$.httpStatus").value(401))
                                .andExpect(jsonPath("$.timestamp").exists());
        }
}
