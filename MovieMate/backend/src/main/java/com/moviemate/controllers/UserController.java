package com.moviemate.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.moviemate.configs.JwtService;
import com.moviemate.dtos.LoginCredentialsDto;
import com.moviemate.dtos.SignUpDto;
import com.moviemate.dtos.UserDto;
import com.moviemate.entities.User;
import com.moviemate.exceptions.AppException;
import com.moviemate.mappers.UserMapper;
import com.moviemate.repositories.UserRepository;
import com.moviemate.services.UserService;

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
        public UserDto loginUser(@RequestBody LoginCredentialsDto loginCredentialsDto) {
        UserDto loggedInUser = userService.login(loginCredentialsDto);
        jwtService.createToken(loggedInUser);
        return loggedInUser;
    }

    // Get the loggedIn user profile by userId
    @GetMapping("/profile/{id}")
    public UserDto getUserProfileById(@PathVariable("id") Long id) {
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
}
