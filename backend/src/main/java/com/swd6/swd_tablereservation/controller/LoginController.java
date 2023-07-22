package com.swd6.swd_tablereservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.swd6.swd_tablereservation.entity.Account;
import com.swd6.swd_tablereservation.service.AccountService;

@RestController
@CrossOrigin
public class LoginController {
    @Autowired
    AccountService accountService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody Account account) {
        Account result = accountService.checkLogin(account.getUsername(), account.getPassword());
        ResponseEntity<Account> response = new ResponseEntity<>(HttpStatus.NETWORK_AUTHENTICATION_REQUIRED);
        if (result != null) {
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } else  return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
}
