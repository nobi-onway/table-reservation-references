package com.swd6.swd_tablereservation.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "capacitymasterdata")
public class CapacityMasterData {
    @Id
    @Column
    private int capacityMasterDataId;

    @Column(length = 20)
    private String venue;

    @Column(length = 20)
    private String category;

    @Column
    private int capacity;

    @Column
    private String imageUrl;

}
