package com.swd6.swd_tablereservation.dto;

import java.sql.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
    private int reservationId;
    private String customerName;
    private String imageUrl;
    private Date createDate;
    private String checkinTime;
    private String venue;
    private int numberOfGuest;
    private List<ServiceOrderDTO> serviceList;
    private List<DishOrderDTO> dishList;
    private double serviceAmount;
    private double dishAmount;
    private double depositAmount;
    private String status;
}
