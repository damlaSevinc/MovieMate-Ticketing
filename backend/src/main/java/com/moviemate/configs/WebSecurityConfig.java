package com.moviemate.configs;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> {
                cors.configurationSource(corsConfigurationSource());
            })
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests((request) -> request
                .requestMatchers(HttpMethod.POST, "/login", "/register", "/tickets").permitAll()
                .requestMatchers(HttpMethod.GET, "/users/**", "/tickets/**", "/seats" ).permitAll()
                .requestMatchers(HttpMethod.GET, "/movies", "/movies/*", "/movies/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/users/**").permitAll()
                .requestMatchers(HttpMethod.PATCH, "/users/**").permitAll()
                .anyRequest().authenticated());
            return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


}
