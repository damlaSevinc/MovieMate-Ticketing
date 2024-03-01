package com.moviemate.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.moviemate.dtos.LoginCredentialsDto;
import com.moviemate.dtos.SignUpDto;
import com.moviemate.dtos.UserDto;
import com.moviemate.services.UserService;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

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
    public UserDto loginUser(@RequestBody LoginCredentialsDto user) {
        UserDto loggedInUser = userService.login(user);
        return loggedInUser;
    }

}
