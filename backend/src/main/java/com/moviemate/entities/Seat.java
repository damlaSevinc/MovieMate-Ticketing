package com.moviemate.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "seats")
@EqualsAndHashCode(of = "id")
public class Seat implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String seatNumber;

    // Using JsonIgnore helps to prevent infinite recursion in JSON serialization
    @ManyToMany(mappedBy = "assignedSeats", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Ticket> tickets = new HashSet<>();

    // Default constructor for JPA
    public Seat() {}

    // Constructor for deserialization
    // To fix parse error: no String-argument constructor/factory method to deserialize from String value ('D4')]
    public Seat(String seatNumber) {
        this.seatNumber = seatNumber;
    }}
