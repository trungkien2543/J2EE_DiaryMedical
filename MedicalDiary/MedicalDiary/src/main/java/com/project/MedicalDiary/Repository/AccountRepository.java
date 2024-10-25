package com.project.MedicalDiary.Repository;

import com.project.MedicalDiary.Entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findAll();
    Optional<Account> findByEmail(String email);
    Optional<Account> findByEmailAndPassword(String email, String password);

}
