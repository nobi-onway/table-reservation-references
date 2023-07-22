package com.swd6.swd_tablereservation.repository;

import com.swd6.swd_tablereservation.entity.ServiceOrder;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceOrderRepository extends JpaRepository<ServiceOrder, Integer> {

    @Query(value = "SELECT * FROM ServiceOrder WHERE reservation_id = ?1", nativeQuery = true)
    @Transactional
    List<ServiceOrder> getServiceOrderByReservationId(int reID);

    @Modifying
    @Query(value = "INSERT INTO ServiceOrder([reservation_id], [service_id]) VALUES (?1, ?2)", nativeQuery = true)
    @Transactional
    public void addServiceOrder(int reservationId, int serviceId);

}
