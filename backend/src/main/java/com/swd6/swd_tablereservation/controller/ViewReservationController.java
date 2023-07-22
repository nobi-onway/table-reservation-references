package com.swd6.swd_tablereservation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.swd6.swd_tablereservation.dto.ReservationDTO;
import com.swd6.swd_tablereservation.service.ViewReservationService;

@RestController
@RequestMapping("/reservations")
@CrossOrigin
public class ViewReservationController {
    @Autowired
    ViewReservationService viewReservationService;

    @GetMapping("/username")
    public List<ReservationDTO> getReservationByUsername(@RequestParam String username) {
        return viewReservationService.getReservationByUsername(username);
    }

    @GetMapping("/status")
    public List<ReservationDTO> getReservationByStatus(@RequestParam String status) {
        return viewReservationService.getReservationByStatus(status);
    }

    @GetMapping()
    public List<ReservationDTO> getAllReservations() {
        return viewReservationService.getAllReservations();
    }

}
