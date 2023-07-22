package com.swd6.swd_tablereservation.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.swd6.swd_tablereservation.entity.Dish;
import com.swd6.swd_tablereservation.service.ViewDishService;

@RestController
@RequestMapping("/dishes")
@CrossOrigin
public class ViewDishController {
    @Autowired
    ViewDishService viewDishService;

    @GetMapping
    public List<Dish> getDish() {
        return viewDishService.getDish();
    }
}