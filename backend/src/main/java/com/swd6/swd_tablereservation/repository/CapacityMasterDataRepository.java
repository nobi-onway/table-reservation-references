package com.swd6.swd_tablereservation.repository;

import com.swd6.swd_tablereservation.entity.CapacityMasterData;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CapacityMasterDataRepository extends JpaRepository<CapacityMasterData, String> {

    @Query(value = "SELECT * FROM CapacityMasterData WHERE capacity_master_data_id = ?1", nativeQuery = true)
    @Transactional
    CapacityMasterData GetMasterDataById(int capacityMasterDataId);

}
