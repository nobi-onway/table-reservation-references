package com.swd6.swd_tablereservation.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.swd6.swd_tablereservation.dto.ResServiceDTO;
import com.swd6.swd_tablereservation.service.OrderServiceService;

@RestController
@RequestMapping("/{reservationId}/order-service")
public class OrderServiceController {
    @Autowired
    OrderServiceService orderServiceService;

    @PostMapping
    public ResponseEntity<?> OrderService(@PathVariable(value = "reservationId") int reservationId,
            @RequestBody List<Integer> orderList) {
        orderServiceService.orderService(reservationId, orderList);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}
