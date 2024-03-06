package com.moviemate.dtos;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class UserDto {
    private Long id;
    private String firstName;
    private String email;
    private String token;

}
