package com.swd6.swd_tablereservation.entity;

import java.sql.Date;
import java.sql.Time;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Capacity")
public class Capacity {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int capacityId;

    @Column
    private int capacityMasterDataId;

    @Column
    private Date date;

    @Column
    private Time pointOfTime;

    @Column
    private int reservedCapacity;

}
