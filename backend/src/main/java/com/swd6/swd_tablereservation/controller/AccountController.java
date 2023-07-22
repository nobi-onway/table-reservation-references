package com.swd6.swd_tablereservation.controller;

import com.swd6.swd_tablereservation.entity.Account;
import com.swd6.swd_tablereservation.repository.AccountRepository;
import com.swd6.swd_tablereservation.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    AccountService accountService;

    @PutMapping("/{username}")
    public ResponseEntity UpdateAccountInfo(@PathVariable String username,
                                            @RequestBody Account account){
        int t = 0;
        if (account.getPassword() != null){
            t = accountService.updateUserWithPassword(username, account);
        } else t= accountService.updateUserInfo(username, account);
        if (t > 0){
            return new ResponseEntity<>(HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.CONFLICT);
    }
    @GetMapping("/{username}")
    public Account getAccountInfo(@PathVariable String username){
        return accountService.getInfoByUsername(username);
    }
}
