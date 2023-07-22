package com.swd6.swd_tablereservation.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.swd6.swd_tablereservation.entity.Dish;
import com.swd6.swd_tablereservation.repository.DishRepository;

@Service
public class ViewDishService {
	@Autowired
	DishRepository dishRepo;

	public List<Dish> getDish() {
		return dishRepo.getDishList();
	}

}