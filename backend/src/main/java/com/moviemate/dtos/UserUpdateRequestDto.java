package com.moviemate.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

import lombok.Data;

@Data
public class UserUpdateRequestDto {

    @Size(max = 50, message = "First name cannot exceed 50 characters")
    private String firstName;

    @Size(max = 50, message = "Last name cannot exceed 50 characters")
    private String lastName;

    @Email(message = "Email should be valid")
    private String email;
}
