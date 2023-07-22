package com.swd6.swd_tablereservation.controller;

import com.swd6.swd_tablereservation.entity.Reservation;
import com.swd6.swd_tablereservation.service.CreateReservationService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/create-reservation")
public class CreateReservationController {
    @Autowired
    CreateReservationService createReservationService;

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody @NonNull Reservation reservation) {
        System.out.println(reservation.getUsername());
        Reservation insertReservation = createReservationService.createReservation(reservation);
        if (insertReservation != null) {
            return ResponseEntity.status(HttpStatus.OK).body(insertReservation); // 200
        } else
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null); // 501

    }

}
