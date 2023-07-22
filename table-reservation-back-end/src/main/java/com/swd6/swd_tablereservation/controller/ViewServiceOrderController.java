package com.swd6.swd_tablereservation.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.swd6.swd_tablereservation.dto.ServiceOrderDTO;
import com.swd6.swd_tablereservation.service.ViewServiceOrderService;

@RestController
@RequestMapping("/{reservationId}/services")
@CrossOrigin
public class ViewServiceOrderController {
    @Autowired
    ViewServiceOrderService viewServiceOrderService;

    @GetMapping
    public List<ServiceOrderDTO> getServiceOrderByReservationId(@PathVariable(value = "reservationId") int reservationId) {
        return viewServiceOrderService.getServiceOrderByReservationID(reservationId);
    }
}