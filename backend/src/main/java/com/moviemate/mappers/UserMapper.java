package com.moviemate.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.moviemate.dtos.SignUpDto;
import com.moviemate.dtos.UserDto;
import com.moviemate.entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "token", ignore = true)
    UserDto toUserDto(User user);

    // It maps the new signUpUser data to the User entity
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "id", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}
