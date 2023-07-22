package com.swd6.swd_tablereservation.controller;

import com.swd6.swd_tablereservation.entity.Capacity;
import com.swd6.swd_tablereservation.entity.CapacityMasterData;
import com.swd6.swd_tablereservation.repository.CapacityRepository;
import com.swd6.swd_tablereservation.service.ManageCapacityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@RestController
@CrossOrigin
public class ManageCapacityController {

    @Autowired
    ManageCapacityService manageCapacityService;

    @GetMapping("/capacity-master-data")
    public List<CapacityMasterData> getAllCapacityMasterData() {
        return manageCapacityService.getAllCapacityMasterData();
    }

    @GetMapping("/get-capacity-from-reservation")
    public String getCapacityFromReservation(@RequestParam int capacityMasterDataId, @RequestParam Date checkinDate,
                                               @RequestParam Time checkinTime){
        return manageCapacityService.getCapacityFromReservation(checkinDate,capacityMasterDataId,checkinTime);
    }

}
