package com.moviemate.entities;

import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="sessions")
public class Session {

    @Id
    private LocalTime startTime;

}
