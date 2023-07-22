package com.swd6.swd_tablereservation.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.swd6.swd_tablereservation.dto.DishOrderDTO;
import com.swd6.swd_tablereservation.service.ViewDishOrderService;

@RestController
@RequestMapping("/{reservationId}/dishes")
@CrossOrigin
public class ViewDishOrderController {
    @Autowired
    ViewDishOrderService viewDishOrderService;

    @GetMapping
    public List<DishOrderDTO> getDishOrderById(@PathVariable(value = "reservationId") int reservationId) {
        return viewDishOrderService.getDishOrderByReservationID(reservationId);
    }
}