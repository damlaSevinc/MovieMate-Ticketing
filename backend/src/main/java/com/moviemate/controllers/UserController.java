package com.moviemate.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.moviemate.dtos.AuthResponse;
import com.moviemate.dtos.LoginCredentialsDto;
import com.moviemate.dtos.PasswordChangeDto;
import com.moviemate.dtos.SignUpDto;
import com.moviemate.dtos.UserDto;
import com.moviemate.dtos.UserUpdateRequestDto;
import com.moviemate.services.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody SignUpDto user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.register(user));
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<AuthResponse> loginUser(@RequestBody LoginCredentialsDto loginCredentialsDto) {
        return ResponseEntity.ok(userService.login(loginCredentialsDto));
    }

    @GetMapping("/users/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserDto getUserProfileById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PatchMapping("/users/{id}")
    public ResponseEntity<String> updateUser(
            @PathVariable Long id,
            @RequestBody UserUpdateRequestDto updateRequestDto) {
        userService.updateUser(id, updateRequestDto);
        return ResponseEntity.ok("User updated successfully");
    }

    @PatchMapping("users/{id}/password")
    public ResponseEntity<String> updatePassword(
            @PathVariable Long id,
            @Valid @RequestBody PasswordChangeDto passwordChangeDto) {
        userService.changePassword(id, passwordChangeDto);
        return ResponseEntity.ok("Password updated successfully");
    }
}
