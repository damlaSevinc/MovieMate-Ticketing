package com.moviemate.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {

    // @Value("${jwt.secret}")
    public String jwtSecret;
}
