package com.moviemate.dtos;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AuthResponse {
    private String token;
    private UserDto user;
}
