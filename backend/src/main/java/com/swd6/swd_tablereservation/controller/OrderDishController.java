package com.swd6.swd_tablereservation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.swd6.swd_tablereservation.dto.DishOrderDTO;
import com.swd6.swd_tablereservation.service.OrderDishService;

@RestController
@CrossOrigin
@RequestMapping("/{reservationId}/order-dish")
public class OrderDishController {
    @Autowired
    OrderDishService orderDishService;

    @PostMapping
    public ResponseEntity<?> orderDish(@PathVariable(value = "reservationId") int reservationId,
            @RequestBody List<DishOrderDTO> orderList) {
        orderDishService.orderDish(reservationId, orderList);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}
