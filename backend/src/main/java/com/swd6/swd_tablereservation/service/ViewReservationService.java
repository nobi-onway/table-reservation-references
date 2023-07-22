package com.swd6.swd_tablereservation.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.swd6.swd_tablereservation.dto.DishOrderDTO;
import com.swd6.swd_tablereservation.dto.ServiceOrderDTO;
import com.swd6.swd_tablereservation.dto.ReservationDTO;
import com.swd6.swd_tablereservation.entity.Account;
import com.swd6.swd_tablereservation.entity.CapacityMasterData;
import com.swd6.swd_tablereservation.entity.Reservation;
import com.swd6.swd_tablereservation.repository.AccountRepository;
import com.swd6.swd_tablereservation.repository.DishOrderRepository;
import com.swd6.swd_tablereservation.repository.ReservationRepository;

@Service
public class ViewReservationService {
        @Autowired
        ReservationRepository reservationRepo;

        @Autowired
        DishOrderRepository dishOrderRepo;

        @Autowired
        AccountRepository accountRepo;

        @Autowired
        ViewDishOrderService viewDishOrderService;

        @Autowired
        ViewServiceOrderService viewServiceOrderService;

        @Autowired
        ManageCapacityService manageCapacityService;

        @Autowired
        AccountService accountService;

        public List<ReservationDTO> getAllReservations() {
                List<ReservationDTO> res = new ArrayList<>();
                List<Reservation> resv = reservationRepo.getAllReservations();
                for (Reservation reservation : resv) {
                        List<DishOrderDTO> dishList = viewDishOrderService
                                        .getDishOrderByReservationID(reservation.getReservationId());
                        List<ServiceOrderDTO> serviceList = viewServiceOrderService
                                        .getServiceOrderByReservationID(reservation.getReservationId());
                        CapacityMasterData masterData = manageCapacityService
                                        .getCapacityMasterDataById(reservation.getCapacityMasterDataId());
                        Account creator = accountService.getInfoByUsername(reservation.getUsername());
                        res.add(new ReservationDTO(reservation.getReservationId(), creator.getFullName(),
                                        masterData.getImageUrl(), reservation.getCreateDate(),
                                        reservation.getCheckinTime().toString(), masterData.getVenue(),
                                        reservation.getNumberOfGuest(),
                                        serviceList, dishList, reservation.getServiceAmount(),
                                        reservation.getDishAmount(),
                                        reservation.getDepositAmount(), reservation.getStatus()));
                }
                return res;
        }

        public List<ReservationDTO> getReservationByUsername(String username) {
                List<ReservationDTO> res = new ArrayList<>();
                List<Reservation> resv = reservationRepo.getReservationByUsername(username);
                for (Reservation reservation : resv) {
                        List<DishOrderDTO> dishList = viewDishOrderService
                                        .getDishOrderByReservationID(reservation.getReservationId());
                        List<ServiceOrderDTO> serviceList = viewServiceOrderService
                                        .getServiceOrderByReservationID(reservation.getReservationId());
                        CapacityMasterData masterData = manageCapacityService
                                        .getCapacityMasterDataById(reservation.getCapacityMasterDataId());
                        Account creator = accountService.getInfoByUsername(username);
                        res.add(new ReservationDTO(reservation.getReservationId(), creator.getFullName(),
                                        masterData.getImageUrl(), reservation.getCreateDate(),
                                        reservation.getCheckinTime().toString(), masterData.getVenue(),
                                        reservation.getNumberOfGuest(),
                                        serviceList, dishList, reservation.getServiceAmount(),
                                        reservation.getDishAmount(),
                                        reservation.getDepositAmount(), reservation.getStatus()));
                }
                return res;
        }

        public List<ReservationDTO> getReservationByStatus(String status) {
                List<ReservationDTO> res = new ArrayList<>();
                List<Reservation> resv = reservationRepo.getReservationByStatus(status);
                for (Reservation reservation : resv) {
                        List<DishOrderDTO> dishList = viewDishOrderService
                                        .getDishOrderByReservationID(reservation.getReservationId());
                        List<ServiceOrderDTO> serviceList = viewServiceOrderService
                                        .getServiceOrderByReservationID(reservation.getReservationId());
                        CapacityMasterData masterData = manageCapacityService
                                        .getCapacityMasterDataById(reservation.getCapacityMasterDataId());
                        Account creator = accountService.getInfoByUsername(reservation.getUsername());
                        res.add(new ReservationDTO(reservation.getReservationId(), creator.getFullName(),
                                        masterData.getImageUrl(), reservation.getCreateDate(),
                                        reservation.getCheckinTime().toString(), masterData.getVenue(),
                                        reservation.getNumberOfGuest(),
                                        serviceList, dishList, reservation.getServiceAmount(),
                                        reservation.getDishAmount(),
                                        reservation.getDepositAmount(), reservation.getStatus()));
                }
                return res;
        }
        public Reservation getReservationByReservationID(Integer reservationID){
                return reservationRepo.getReferenceById(reservationID);
        }
}
