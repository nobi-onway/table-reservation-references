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
@Table(name = "DishOrder")
public class DishOrder {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dishOrderId;

    @Column
    private int dishId;

    @Column
    private int reservationId;

    @Column
    private int quantity;

}
