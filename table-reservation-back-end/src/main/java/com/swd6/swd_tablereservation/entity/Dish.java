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
@Table(name = "Dish")
public class Dish {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dishId;

    @Column(length = 50)
    private String name;

    @Column
    private double price;

}
