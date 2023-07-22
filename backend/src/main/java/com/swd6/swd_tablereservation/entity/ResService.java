package com.swd6.swd_tablereservation.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Service")
public class ResService {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int serviceId;

    @Column(length = 50)
    private String name;

    @Column
    private double price;

}
