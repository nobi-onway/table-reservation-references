package com.swd6.swd_tablereservation.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.swd6.swd_tablereservation.dto.ServiceOrderDTO;
import com.swd6.swd_tablereservation.entity.ResService;
import com.swd6.swd_tablereservation.entity.ServiceOrder;
import com.swd6.swd_tablereservation.repository.ServiceOrderRepository;
import com.swd6.swd_tablereservation.repository.ServiceRepository;

@Service
public class ViewServiceOrderService {
	@Autowired
	ServiceOrderRepository serviceOrderRepo;
	@Autowired
	ServiceRepository serviceRepo;

	public List<ServiceOrderDTO> getServiceOrderByReservationID(int reID) {
		List<ServiceOrderDTO> res = new ArrayList<>();
		List<ServiceOrder> tem = serviceOrderRepo.getServiceOrderByReservationId(reID);
		for (ServiceOrder item : tem) {
			ResService resService = serviceRepo.getServiceByID(item.getServiceId());
			res.add(new ServiceOrderDTO(resService.getName(), resService.getPrice()));
		}
		return res;
	}

}