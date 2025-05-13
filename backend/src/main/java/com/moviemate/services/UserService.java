package com.moviemate.services;

import java.nio.CharBuffer;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.moviemate.configs.JwtService;
import com.moviemate.dtos.AuthResponse;
import com.moviemate.dtos.LoginCredentialsDto;
import com.moviemate.dtos.PasswordChangeDto;
import com.moviemate.dtos.SignUpDto;
import com.moviemate.dtos.UserDto;
import com.moviemate.dtos.UserUpdateRequestDto;
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
    private final JwtService jwtService;

    public AuthResponse register(SignUpDto signupDto) {
        userRepository.findByEmail(signupDto.email())
                .ifPresent(user -> {
                    throw new AppException("User already exists", HttpStatus.BAD_REQUEST);
                });
        User user = userMapper.signUpToUser(signupDto);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signupDto.password())));
        User savedUser = userRepository.save(user);
        String token = jwtService.createToken(user);
        return AuthResponse.builder()
                .token(token)
                .user(userMapper.toUserDto(savedUser))
                .build();
    }

    public AuthResponse login(LoginCredentialsDto loginCredentialsDto) {
        User user = userRepository.findByEmail(loginCredentialsDto.email())
                .orElseThrow(() -> new AppException("User not found", HttpStatus.BAD_REQUEST));
        if (!passwordEncoder.matches(new String(loginCredentialsDto.password()), user.getPassword())) {
            throw new AppException("Password is incorrect", HttpStatus.UNAUTHORIZED);
        }
        UserDto userDto = userMapper.toUserDto(user);
        String token = jwtService.createToken(user);
        return AuthResponse.builder()
                .token(token)
                .user(userDto)
                .build();
    }

    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException("User not found with id: " + id, HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }

    @Transactional
    public User updateUser(Long userId, UserUpdateRequestDto updateRequestDto) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new AppException("User not found", HttpStatus.BAD_REQUEST));
        existingUser.setFirstName(updateRequestDto.getFirstName());
        existingUser.setLastName(updateRequestDto.getLastName());
        existingUser.setEmail(updateRequestDto.getEmail());
        return userRepository.save(existingUser);
    }

    public void changePassword(Long userId, PasswordChangeDto passwordChangeDto) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new AppException("User not found", HttpStatus.BAD_REQUEST));
        if (!passwordEncoder.matches(passwordChangeDto.getOldPassword(), existingUser.getPassword())) {
            throw new AppException("Old password is incorrect", HttpStatus.UNAUTHORIZED);
        }
        existingUser.setPassword(passwordEncoder.encode(passwordChangeDto.getNewPassword()));
        userRepository.save(existingUser);
    }
}
