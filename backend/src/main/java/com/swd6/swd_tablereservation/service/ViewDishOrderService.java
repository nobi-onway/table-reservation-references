package com.swd6.swd_tablereservation.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.swd6.swd_tablereservation.dto.DishOrderDTO;
import com.swd6.swd_tablereservation.entity.Dish;
import com.swd6.swd_tablereservation.entity.DishOrder;
import com.swd6.swd_tablereservation.repository.DishOrderRepository;
import com.swd6.swd_tablereservation.repository.DishRepository;

@Service
public class ViewDishOrderService {
	@Autowired
	DishOrderRepository dishOrderRepo;
	@Autowired
	DishRepository dishRepo;

	public List<DishOrderDTO> getDishOrderByReservationID(int reID) {
		List<DishOrderDTO> res = new ArrayList<>();
		List<DishOrder> tem = dishOrderRepo.getDishOrderByReservationId(reID);
		for (DishOrder item : tem) {
			Dish dish = dishRepo.getDishByID(item.getDishId());
			res.add(new DishOrderDTO(reID, item.getDishId(), dish.getName(), item.getQuantity(), dish.getPrice() * item.getQuantity()));
		}
		return res;
	}

}