package com.swd6.swd_tablereservation.service;

import com.swd6.swd_tablereservation.dto.ResServiceDTO;
import com.swd6.swd_tablereservation.entity.ResService;
import com.swd6.swd_tablereservation.entity.Reservation;
import com.swd6.swd_tablereservation.repository.ReservationRepository;
import com.swd6.swd_tablereservation.repository.ServiceOrderRepository;
import java.util.List;

import com.swd6.swd_tablereservation.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class OrderServiceService {
    @Autowired
    ServiceOrderRepository serviceOrderRepo;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    ReservationRepository reservationRepository;

    public void orderService(int reservationId, List<Integer> orderList) {
        int serviceAmount = 0;
        ResService resService;
        for (int serviceId : orderList) {
            serviceOrderRepo.addServiceOrder(reservationId, serviceId);
            resService = serviceRepository.getServiceByID(serviceId);
            serviceAmount += resService.getPrice();
        }
        if (serviceAmount > 0){
            Reservation reservation = reservationRepository.getReferenceById(reservationId);
            reservation.setDepositAmount(reservation.getDepositAmount() + serviceAmount * 0.1);
            reservation.setServiceAmount(serviceAmount);
            reservationRepository.saveAndFlush(reservation);
        }
    }

}
