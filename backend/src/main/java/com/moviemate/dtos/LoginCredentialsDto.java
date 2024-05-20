package com.moviemate.dtos;

public record LoginCredentialsDto (
    String email,
    char[] password
){}
