package com.swd6.swd_tablereservation.service;

import com.swd6.swd_tablereservation.RESERVATION_STATUS;
import com.swd6.swd_tablereservation.entity.Capacity;
import com.swd6.swd_tablereservation.entity.Reservation;
import com.swd6.swd_tablereservation.repository.CapacityRepository;
import com.swd6.swd_tablereservation.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChangeReservationStatusService {
    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    CapacityRepository capacityRepository;

    public Reservation cancelReservation(int reservationId) {
        Reservation reservation = reservationRepository.getReferenceById(reservationId);
        reservation.setStatus(RESERVATION_STATUS.CANCELLED);
        try {
            reservationRepository.save(reservation);
            Capacity capacity = capacityRepository
                    .getCapacityFromReservation(reservation.getCheckinDate().toString(), reservation.getCapacityMasterDataId(), reservation.getCheckinTime().toString());
            if (capacity != null) {
                capacity.setReservedCapacity(capacity.getReservedCapacity() - reservation.getNumberOfGuest());
            }
            capacityRepository.saveAndFlush(capacity);
            return reservation;
        } catch (Exception ex) {
            return null;
        }
    }

    public Reservation confirmReservation(int reservationId) {
        Reservation reservation = reservationRepository.getReferenceById(reservationId);
        reservation.setStatus(RESERVATION_STATUS.PENDING_DEPOSIT);
        try {
            reservationRepository.saveAndFlush(reservation);
            return reservation;
        } catch (Exception ex) {
            return null;
        }
    }

    public Reservation depositReservation(int reservationId) {
        Reservation reservation = reservationRepository.getReferenceById(reservationId);
        reservation.setStatus(RESERVATION_STATUS.RESERVED);
        try {
            reservationRepository.saveAndFlush(reservation);
            return reservation;
        } catch (Exception ex) {
            return null;
        }
    }
}