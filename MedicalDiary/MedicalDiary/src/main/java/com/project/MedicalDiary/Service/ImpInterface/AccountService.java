package com.project.MedicalDiary.Service.ImpInterface;

import com.project.MedicalDiary.Entity.Account;

import lombok.Locked.Write;

import java.util.List;
import java.util.Optional;

public interface AccountService {
    Account createAccount(Account account);
    List<Account> getAllAccounts();


    Optional<Account> findByEmail(String email);
//    Optional<Account> findByUsername(String username);
    Optional<Account> findByEmailAndPassword(String email, String password);
//    Optional<Account> findByUsernameAndPassword(String username, String password);
    boolean deleteAccount(String accountId);
    Account updateAccount(Account account);
    // Write change account password
    Boolean changePassword(String email, String oldPassword, String newPassword);
}
