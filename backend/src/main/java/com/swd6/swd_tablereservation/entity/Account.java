package com.swd6.swd_tablereservation.entity;

import java.sql.Date;
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
@Table(name = "Account")
public class Account {
    @Id
    @Column(length = 20)
    private String username;

    @Column(length = 50)
    private String password;

    @Column(length = 50)
    private String fullName;

    @Column(length = 50)
    private String email;

    @Column(length = 15)
    private String phone;

    public Account(String username, String password){
        this.username = username;
        this.password = password;
        this.fullName = "";
        this.email = "";
        this.phone = ""; 
    }

}
