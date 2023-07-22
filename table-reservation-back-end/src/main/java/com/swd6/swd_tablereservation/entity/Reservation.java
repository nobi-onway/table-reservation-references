package com.swd6.swd_tablereservation.entity;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Reservation")
public class Reservation {
    @Id
    @Column(name = "reservation_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reservationId = 0;

    @Column(length = 20)
    private String username;

    @Column
    private int capacityMasterDataId;

    @Column
    private String status;

    @Column
    private Date createDate;

    @Column
    private Date checkinDate;

    @Column
    private Time checkinTime;


    @Column
    private int numberOfGuest;

    @Column
    private double serviceAmount;

    @Column
    private double dishAmount;

    @Column
    private double depositAmount;

    @Override
    public String toString() {
        return "{\"reservationId\":" + reservationId + ", \"username\":\"" + username + "\", \"capacityMasterDataId\":"
                + capacityMasterDataId + ", \"status\":\"" + status + "\", \"createDate\":\"" + createDate + "\", \"checkinDate\":\""
                + checkinDate + "\", \"checkinTime\":\"" + checkinTime + "\", \"numberOfGuest\":" + numberOfGuest + ", \"serviceAmount\":"
                + serviceAmount + ", \"dishAmount\":" + dishAmount + ", \"depositAmount\":" + depositAmount + "}";
    }

    

}
