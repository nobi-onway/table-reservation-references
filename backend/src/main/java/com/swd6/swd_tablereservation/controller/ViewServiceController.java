package com.swd6.swd_tablereservation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.swd6.swd_tablereservation.entity.ResService;
import com.swd6.swd_tablereservation.service.ViewServiceService;

@RestController
@RequestMapping("/services")
@CrossOrigin
public class ViewServiceController {
    @Autowired
    ViewServiceService viewServiceService;

    @GetMapping
    public List<ResService> getService() {
        return viewServiceService.getService();
    }
}