package com.swd6.swd_tablereservation.service;

import com.swd6.swd_tablereservation.entity.Account;
import com.swd6.swd_tablereservation.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class AccountService {
    @Autowired
    AccountRepository accountRepository;

    public Account checkLogin(String username, String password) {
        return accountRepository.getAccountForLogin(username, password);
    }
    public int updateUserInfo(String username, Account account) {
        return accountRepository.updateAccountInfor(
                username, account.getFullName(),
                account.getPhone(), account.getEmail()
        );
    }
    public int updateUserWithPassword(String username, Account account) {
        return accountRepository.updateAccountWithPassword(
                username, account.getFullName(),
                account.getPhone(), account.getEmail(),account.getPassword()
        );
    }

    public Account getInfoByUsername(String username) {
        return accountRepository.findById(username).get();
    }
}
