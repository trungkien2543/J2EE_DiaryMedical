package com.project.MedicalDiary.Service;

import com.project.MedicalDiary.Entity.Account;
import com.project.MedicalDiary.Repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Autowired
    public CustomUserDetailsService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Account user = accountRepository.findByEmail(username)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));;
//
////        if (user == null) {
////            throw new UsernameNotFoundException("User not found");
////        }
//        return new CustomUserDetails(user) {
//        };
//        // Create a custom UserDetails implementation
//    }

//    HUYNH QUOC TIEN
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        // Your logic to load user by username
//        Account account = accountRepository.findByEmail(email)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
//        // Return UserDetails implementation
//        return org.springframework.security.core.userdetails.User.builder()
//                .username(account.getEmail())
//                .password(account.getPassword())
//                .roles("USER") // Adjust roles as needed
//                .build();
//    }
@Override
public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Account account = accountRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

    // Wrap the Account in CustomUserDetails and return it
    return new CustomUserDetails(account);
}



}
