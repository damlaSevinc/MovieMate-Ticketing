package com.moviemate.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId;

    @ManyToOne
    private User user;

    @ManyToOne
    private Showtime showtime;

    private Long adultCount;
    private Long childCount;
    private Double paidAmount;
    private String selectedDate;
    private String orderDate;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "ticket_seats",
    joinColumns = @JoinColumn(name = "ticket_id"),
    inverseJoinColumns = @JoinColumn(name = "seat_id"))
    private Set<Seat> assignedSeats = new HashSet<>();

    @PrePersist
    public void generateContractNumber() {
        this.orderId = generateTicketNumber();
    }

    private Long generateTicketNumber() {
        return Long.valueOf(System.currentTimeMillis() / 5000);
    }
}
