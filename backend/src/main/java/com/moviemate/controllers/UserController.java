package com.moviemate.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.moviemate.configs.JwtService;
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

import jakarta.validation.Valid;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;

    // Register a new user
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto registerUser(@RequestBody SignUpDto user) {
        UserDto createdUser = userService.register(user);
        return createdUser;
    }

    // Login as an existing user
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserDto> loginUser(@RequestBody LoginCredentialsDto loginCredentialsDto) {
        UserDto loggedInUser = userService.login(loginCredentialsDto);
        String token = jwtService.createToken(loggedInUser);
        loggedInUser.setToken(token);
        return ResponseEntity.ok(loggedInUser);
    }

    // Get the loggedIn user by userId
    @GetMapping("/users/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserDto getUserProfileById(@PathVariable Long id) {
        System.out.println("userid from decoded token is: " + id);
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            UserDto userDto = userMapper.toUserDto(user);
            return userDto;
        } else {
            throw new AppException("User not found with id: " + id, HttpStatus.BAD_REQUEST);
        }
    }

    // Edit the existing user's info
    @PatchMapping("/users/{id}")
    public ResponseEntity<String> updateUser(
            @PathVariable Long id,
            @RequestBody UserUpdateRequestDto updateRequestDto) {
        try {
            userService.updateUser(id, updateRequestDto);
            return ResponseEntity.ok("User updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Change the user password
    @PatchMapping("users/{id}/password")
    public ResponseEntity<String> updatePassword(
            @PathVariable Long id,
            @Valid @RequestBody PasswordChangeDto passwordChangeDto) {
        try {
            userService.changePassword(id, passwordChangeDto);
            return ResponseEntity.ok("Password updated successfully");
        } catch (AppException e) {
            if (e.getHttpStatus() == HttpStatus.BAD_REQUEST) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            } else if (e.getHttpStatus() == HttpStatus.UNAUTHORIZED) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
            }
        }
    }
}
