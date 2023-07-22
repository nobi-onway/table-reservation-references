package com.swd6.swd_tablereservation.repository;

import com.swd6.swd_tablereservation.entity.DishOrder;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DishOrderRepository extends JpaRepository<DishOrder, Integer> {
    @Query(value = "SELECT * FROM DishOrder do WHERE do.reservation_id = ?1", nativeQuery = true)
    @Transactional
    public List<DishOrder> getDishOrderByReservationId(int reID);

    @Modifying
    @Query(value = "INSERT INTO DishOrder([dish_id], [reservation_id], [quantity]) VALUES (?1, ?2, ?3)", nativeQuery = true)
    @Transactional
    public void addDishOrder(int dishId, int reservationId, int quantity);
}
