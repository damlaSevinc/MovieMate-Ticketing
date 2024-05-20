package com.moviemate.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "seats")
public class Seat implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String seatNumber;

    @ManyToMany(mappedBy = "assignedSeats")
    private Set<Ticket> tickets = new HashSet<>();

    // Default constructor for JPA
    public Seat() {}

    // Constructor for deserialization
    public Seat(String seatNumber) {
        this.seatNumber = seatNumber;
    }
}
