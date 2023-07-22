package com.swd6.swd_tablereservation.service;

import java.sql.Time;
import java.util.Date;
import java.util.List;

import com.swd6.swd_tablereservation.entity.Capacity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.swd6.swd_tablereservation.entity.CapacityMasterData;
import com.swd6.swd_tablereservation.repository.CapacityMasterDataRepository;
import com.swd6.swd_tablereservation.repository.CapacityRepository;

@Service
public class ManageCapacityService {
    @Autowired
    CapacityMasterDataRepository capacityMasterDataRepo;

    @Autowired
    CapacityRepository capacityRepository;

    public CapacityMasterData getCapacityMasterDataById(int capacityMasterDataId) {
        return capacityMasterDataRepo.findById(String.valueOf(capacityMasterDataId)).get();
    }

    public List<CapacityMasterData> getAllCapacityMasterData() {
        return capacityMasterDataRepo.findAll();
    }

    public String getCapacityFromReservation(Date checkinDate, int capacityMasterDataId, Time checkinTime){

    Capacity capacity =  capacityRepository.getCapacityFromReservation(checkinDate.toString(),capacityMasterDataId,checkinTime.toString());
    CapacityMasterData capacityMasterData = capacityMasterDataRepo.getReferenceById(capacityMasterDataId + "");;
    if (capacity != null)
    return String.valueOf(capacityMasterData.getCapacity() - capacity.getReservedCapacity());
    else return String.valueOf(capacityMasterData.getCapacity());
    }
}
