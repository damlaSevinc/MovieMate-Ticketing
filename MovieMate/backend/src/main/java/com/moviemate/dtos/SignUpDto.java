package com.moviemate.dtos;

public record SignUpDto (
    String firstName,
    String lastName,
    String email,
    char[] password
){}
