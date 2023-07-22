package com.swd6.swd_tablereservation.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.swd6.swd_tablereservation.entity.ResService;
import com.swd6.swd_tablereservation.repository.ServiceRepository;

@Service
public class ViewServiceService {
	@Autowired
	ServiceRepository serviceRepo;

	public List<ResService> getService() {
		// TODO Auto-generated method stub
		return serviceRepo.getServiceList();
	}

}