package com.moviemate.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
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
    private Long paidAmount;
}
