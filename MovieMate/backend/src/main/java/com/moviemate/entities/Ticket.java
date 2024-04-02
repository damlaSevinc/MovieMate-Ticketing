package com.moviemate.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    private Long ticketId;

    @ManyToOne
    private User user;

    @ManyToOne
    private Showtime showtime;

    private Long adultCount;
    private Long childCount;
    private Double paidAmount;
    private String selectedDate;

    @PrePersist
    public void generateContractNumber() {
        this.ticketId = generateTicketNumber();
    }

    private Long generateTicketNumber() {
        return Long.valueOf(System.currentTimeMillis() / 5000);
    }
}
