package com.project.MedicalDiary.Service.Imp;

import com.project.MedicalDiary.Entity.Account;
import com.project.MedicalDiary.Repository.AccountRepository;
import com.project.MedicalDiary.Service.ImpInterface.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImp implements AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountServiceImp(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public Account createAccount(Account account) {
        // You can add any business logic here before saving the account
        return accountRepository.save(account);
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }



    @Override
    public Optional<Account> findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    @Override
    public Optional<Account> findByEmailAndPassword(String email, String password) {
        return accountRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public boolean deleteAccount(String accountId) {
        if (accountRepository.existsById(accountId)) {
            accountRepository.deleteById(accountId);
            return true; // Deletion successful
        }
        return false; // Account does not exist
    }

    @Override
    public Account updateAccount(Account account) {
        return accountRepository.save(account);
    }
}
