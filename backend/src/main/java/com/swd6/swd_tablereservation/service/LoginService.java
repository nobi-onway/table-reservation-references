package com.swd6.swd_tablereservation.service;

import com.swd6.swd_tablereservation.entity.Account;
import com.swd6.swd_tablereservation.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class LoginService {
    @Autowired
    AccountRepository accountRepository;
    
    public Account checkLogin(String username, String password) {
        return accountRepository.getAccountForLogin(username, password);
    }
}
