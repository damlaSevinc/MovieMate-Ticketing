# API Documentation

## Overview

This document provides details about the API endpoints available in the application.

## Authentication

The API uses JWT (JSON Web Token) for authentication. The token is generated when a user logs in and is required for all requests that require authentication.

## Endpoints Summary

| Method | Endpoint                                   | Description                                  | Parameters                                           |
|--------|--------------------------------------------|----------------------------------------------|------------------------------------------------------|
| POST   | `/register`                                | Create a new user                            | `User` (object) (body)                               |
| POST   | `/login`                                   | Login user                                   | `email`, `password` (body)                           |
| GET    | `/users/{id}`                              | Retrieves an existing user                   | `id` (path)                                          |
| PUT    | `/users/{id}`                              | Updates an existing user                     | `id` (path), `firstName`, `lastName`, `email` (body) |
| PUT    | `/users/{id}/password`                     | Updates password of an existing user         | `id` (path), `password` (body)                       |
| GET    | `/movies`                                  | Retrieves all movies                         | None                                                 |
| GET    | `/movies/{id}`                             | Retrieves a movie by id                      | `id` (path)                                          |
| GET    | `/movies/{id}/showtimes`                   | Retrieves showtimes by movie id              | `id` (path)                                          |
| GET    | `/movies/{movieId}/showtimes/{showtimeId}` | Retrieves showtime by movie and showtime ids | `movieId` (path), `showtimeId` (path)                |
| POST   | `/tickets`                                 | Creates a new ticket                         | `Ticket` (object) (body)                             |
| GET    | `/users/{userId}/tickets/asc`              | Retrieves tickets by user id ascending       | `userId` (path)                                      |
| GET    | `/users/{userId}/tickets/desc`             | Retrieves tickets by user id descending      | `userId` (path)                                      |
| GET    | `/tickets/{id}`                            | Retrieves a ticket by id                     | `id` (path)                                          |

## Response Status Codes

- **200 OK**: The request was successful.
- **201 Created**: The request was successful and a new resource was created.
- **400 Bad Request**: The request could not be understood or was missing required parameters.
- **401 Unauthorized**: Authentication failed or user does not have permissions for the requested operation.
- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: An error occurred on the server.
