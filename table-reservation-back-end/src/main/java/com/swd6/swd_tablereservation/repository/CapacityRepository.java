package com.swd6.swd_tablereservation.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import com.swd6.swd_tablereservation.entity.Capacity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.xml.crypto.Data;
import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Repository
public interface CapacityRepository extends JpaRepository<Capacity, Integer> {

    @Query(value = "SELECT capacity_master_data_id FROM Capacity WHERE capacity_id = ?1", nativeQuery = true)
    int GetCapacityMasterDataIdByCapacityId(int capacityId);

    @Query(value = "SELECT point_of_time FROM Capacity WHERE date = ?1 AND capacity_master_data_id = ?2", nativeQuery = true)
    List<Time> getCapacitiesByDateAndAndCapacityMasterDataId(Date date, int capacity_master_data_id);

    @Query(value = "SELECT * FROM Capacity WHERE [date] = ?1 AND capacity_master_data_id = ?2 AND point_of_time=?3", nativeQuery = true)
    Capacity getCapacityFromReservation(String date, int capacity_master_data_id, String point_of_time);

}
