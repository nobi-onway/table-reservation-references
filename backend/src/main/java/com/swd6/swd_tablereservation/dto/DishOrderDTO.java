package com.swd6.swd_tablereservation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DishOrderDTO {
    private int reservationId;
    private int dishId;
    private String name;
    private int quantity;
    private double totalPrice;
}