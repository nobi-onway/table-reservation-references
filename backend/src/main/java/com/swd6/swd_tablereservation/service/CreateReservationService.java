package com.swd6.swd_tablereservation.service;

import com.swd6.swd_tablereservation.entity.Capacity;
import com.swd6.swd_tablereservation.entity.Reservation;
import com.swd6.swd_tablereservation.repository.CapacityRepository;
import com.swd6.swd_tablereservation.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateReservationService {
    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    CapacityRepository capacityRepository;

    public Reservation createReservation(Reservation reservation) {
        System.out.println(reservation.getCapacityMasterDataId());
        Capacity capacity = capacityRepository
                .getCapacityFromReservation(reservation.getCheckinDate().toString(), reservation.getCapacityMasterDataId(), reservation.getCheckinTime().toString());
        if (capacity != null) {
            capacity.setReservedCapacity(capacity.getReservedCapacity() + reservation.getNumberOfGuest());
        } else{
            capacity = new Capacity();
            capacity.setDate(reservation.getCheckinDate());
            capacity.setCapacityMasterDataId(reservation.getCapacityMasterDataId());
            capacity.setPointOfTime(reservation.getCheckinTime());
            capacity.setReservedCapacity(reservation.getNumberOfGuest());
        }
        capacityRepository.saveAndFlush(capacity);
        if (reservation.getNumberOfGuest() >= 10){
            reservation.setDepositAmount(reservation.getNumberOfGuest() * 10);//1 customer need to deposit 10$
        }
        return reservationRepository.saveAndFlush(reservation);
    }

}