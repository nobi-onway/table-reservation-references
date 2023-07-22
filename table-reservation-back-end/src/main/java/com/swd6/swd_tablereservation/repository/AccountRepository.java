package com.swd6.swd_tablereservation.repository;

import com.swd6.swd_tablereservation.entity.Account;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    @Query(value = "SELECT * FROM Account a WHERE a.username = ?1 AND a.password = ?2", nativeQuery = true)
    @Transactional
    public Account getAccountForLogin(String username, String password);

    @Modifying
    @Transactional
    @Query(value = "Update Account " +
            "SET full_name = ?2, phone = ?3, email = ?4 " +
            "WHERE username = ?1", nativeQuery = true)
    public int updateAccountInfor(String username, String fullName, String phone, String email);
    @Modifying
    @Transactional
    @Query(value = "Update Account " +
            "SET full_name = ?2, phone = ?3, email = ?4 , password=?5 " +
            "WHERE username = ?1", nativeQuery = true)
    public int updateAccountWithPassword(String username, String fullName, String phone, String email, String password);

}
