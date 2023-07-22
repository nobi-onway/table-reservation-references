package com.swd6.swd_tablereservation.service;

import com.swd6.swd_tablereservation.dto.DishOrderDTO;
import com.swd6.swd_tablereservation.entity.Dish;
import com.swd6.swd_tablereservation.entity.ResService;
import com.swd6.swd_tablereservation.entity.Reservation;
import com.swd6.swd_tablereservation.repository.DishOrderRepository;
import java.util.List;

import com.swd6.swd_tablereservation.repository.DishRepository;
import com.swd6.swd_tablereservation.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class OrderDishService {
    @Autowired
    DishOrderRepository dishOrderRepo;

    @Autowired
    DishRepository dishRepository;

    @Autowired
    ReservationRepository reservationRepository;

    public void orderDish(int reservationId, List<DishOrderDTO> orderList) {
        int dishAmount = 0;

        for (DishOrderDTO dishOrder : orderList) {
            dishOrderRepo.addDishOrder(dishOrder.getDishId(), reservationId, dishOrder.getQuantity());
            Dish dishOrderBase = dishRepository.getReferenceById(dishOrder.getDishId());
            dishAmount += (dishOrderBase.getPrice() * dishOrder.getQuantity());
        }

        if (dishAmount > 0){
                Reservation reservation = reservationRepository.getReferenceById(reservationId);
                reservation.setDepositAmount(reservation.getDepositAmount() + dishAmount * 0.1);
                reservation.setDishAmount(dishAmount);
                reservationRepository.saveAndFlush(reservation);
            }
    }

}
