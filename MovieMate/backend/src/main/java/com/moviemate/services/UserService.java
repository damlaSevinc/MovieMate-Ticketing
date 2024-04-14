package com.moviemate.services;

import java.nio.CharBuffer;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.moviemate.dtos.LoginCredentialsDto;
import com.moviemate.dtos.SignUpDto;
import com.moviemate.dtos.UserDto;
import com.moviemate.entities.User;
import com.moviemate.exceptions.AppException;
import com.moviemate.mappers.UserMapper;
import com.moviemate.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;


    public UserDto register(SignUpDto signupDto){

        // I check, if the user already exists in the database. If it does, throws an exception
        Optional<User> oUser = userRepository.findByEmail(signupDto.email());
        if (oUser.isPresent()){
            throw new AppException("User already exists", HttpStatus.BAD_REQUEST);
        }

        // If the user doesn't exist, I create the new user on the database within the hashed password
        User user = userMapper.signUpToUser(signupDto);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signupDto.password())));
        User savedUser = userRepository.save(user);

        // I return the created user as Dto due to security concerns
        return userMapper.toUserDto(savedUser);
    }

    public UserDto login(LoginCredentialsDto loginCredentialsDto){

        // I check, if the user doesn't exist in the database
        Optional<User> oUser = userRepository.findByEmail(loginCredentialsDto.email());
        if (!oUser.isPresent()){
            throw new AppException("There is no such a user", HttpStatus.BAD_REQUEST);
        }

        // If the user exists, compare two passwords if they match
        User user = oUser.get();
        String providedPassword = new String(loginCredentialsDto.password());
        if (passwordEncoder.matches(providedPassword, user.getPassword())){
            return userMapper.toUserDto(user);
        }

        // If the user exists, but the password is wrong
        throw new AppException("password is wrong", HttpStatus.UNAUTHORIZED);
    }

    @Transactional
    public User updateUser(Long userId, User updatedUser){
        User existingUser = userRepository.findById(userId).
            orElseThrow(() -> new AppException("There is no such a user", HttpStatus.BAD_REQUEST));
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setEmail(updatedUser.getEmail());
            return userRepository.save(existingUser);
    }

    @Transactional
    public void changePassword(Long userId, String password){
        User existingUser = userRepository.findById(userId).
            orElseThrow(() -> new AppException("There is no such a user", HttpStatus.BAD_REQUEST));
            existingUser.setPassword(password);
            userRepository.save(existingUser);
    }
}
