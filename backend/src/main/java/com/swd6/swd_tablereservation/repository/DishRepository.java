package com.swd6.swd_tablereservation.repository;

import com.swd6.swd_tablereservation.entity.Dish;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DishRepository extends JpaRepository<Dish, Integer> {

    @Query(value = "SELECT * FROM Dish ", nativeQuery = true)
    @Transactional
    public List<Dish> getDishList();

    @Query(value = "SELECT * FROM Dish WHERE dish_id= ?1", nativeQuery = true)
    @Transactional
    public Dish getDishByID(int dID);

}
