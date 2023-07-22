package com.swd6.swd_tablereservation.controller;

import com.swd6.swd_tablereservation.entity.Reservation;
import com.swd6.swd_tablereservation.service.ChangeReservationStatusService;
import com.swd6.swd_tablereservation.service.ViewReservationService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.spring.web.json.Json;

@RestController
@CrossOrigin
public class ChangeReservationStatusController {
    @Autowired
    ChangeReservationStatusService changeReservationStatusService;

    @Autowired
    ViewReservationService viewReservationService;

    @PostMapping("/{reservationId}/{status}")
    public ResponseEntity cancelReservation(@PathVariable("reservationId") @NonNull int reservationId,
                                            @PathVariable("status") @NonNull String status) {
        HttpStatus statusResult = HttpStatus.valueOf(501);
        ResponseEntity<?> response = ResponseEntity.status(501).body(null);
        if (status.equals("cancel")) {
            Reservation res = changeReservationStatusService.cancelReservation(reservationId);
            if (res != null) {
                response = ResponseEntity.status(HttpStatus.OK).body(res.toString());
            }
        } else if (status.equals("approve")) {
            Reservation res = changeReservationStatusService.confirmReservation(reservationId);
            if (res != null) {
                response = ResponseEntity.status(HttpStatus.OK).body(res.toString());
            }
        } else if (status.equals("deposit")) {
            Reservation res = changeReservationStatusService.depositReservation(reservationId);
            if (res != null) {
                response = ResponseEntity.status(HttpStatus.OK).body(res.toString());
            }
        }
        return response;
    }
}
