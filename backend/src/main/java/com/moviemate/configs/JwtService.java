package com.moviemate.configs;

import java.util.Date;

import org.springframework.stereotype.Service;
import com.auth0.jwt.JWTVerifier;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.moviemate.entities.User;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtConfig jwtConfig;
    private JWTVerifier jwtVerifier;

    @PostConstruct
    public void configureJwtAlgorithm() {

    }

    public DecodedJWT verifyToken(String token){
        return jwtVerifier.verify(token);
    }

    public String createToken(User user) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 360000000);

        Algorithm jwtAlgorithm = Algorithm.HMAC512(jwtConfig.jwtSecret);
        jwtVerifier = JWT.require(jwtAlgorithm).build();

        return JWT.create()
                .withSubject(user.getId().toString())
                .withExpiresAt(validity)
                .sign(jwtAlgorithm);
    }
}
