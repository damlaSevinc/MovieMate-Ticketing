package com.moviemate.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.moviemate.configs.JwtService;
import com.moviemate.dtos.LoginCredentialsDto;
import com.moviemate.dtos.SignUpDto;
import com.moviemate.dtos.UserDto;
import com.moviemate.services.UserService;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;

    // Register a new user
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto registerUser(@RequestBody SignUpDto user) {
        UserDto createdUser = userService.register(user);
        return createdUser;
    }

    // Login for an existing user
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
        public Map<String, Object> loginUser(@RequestBody LoginCredentialsDto loginCredentialsDto) {
        UserDto loggedInUser = userService.login(loginCredentialsDto);
        String token = jwtService.createToken(loggedInUser);
        Map<String, Object> response = new HashMap<>();
        response.put("user", loggedInUser);
        response.put("token",token);
        System.out.println("user is: " + loggedInUser.getEmail());
        System.out.println("token: " + token);
        return response;
    }

    // Get the loggedIn user profile through SecurityContext
    @GetMapping("/profile")
    public String getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return "Welcome, " + username;
    }
}
