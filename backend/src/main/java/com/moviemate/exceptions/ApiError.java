package com.moviemate.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiError {
    private final int httpStatus;
    private final String message;
    private final LocalDateTime timestamp;

        public ApiError(HttpStatus status, String message) {
        this(status.value(), message, LocalDateTime.now());
    }
}
