package com.swd6.swd_tablereservation.repository;

import com.swd6.swd_tablereservation.entity.ResService;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<ResService, Integer> {

    @Query(value = "SELECT * FROM Service ", nativeQuery = true)
    @Transactional
    List<ResService> getServiceList();

    @Query(value = "SELECT * FROM Service WHERE service_id=?1", nativeQuery = true)
    @Transactional
    public ResService getServiceByID(int sID);

}
