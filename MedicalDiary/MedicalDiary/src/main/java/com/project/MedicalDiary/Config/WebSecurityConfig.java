package com.project.MedicalDiary.Config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/","/home", "/css/**", "/js/**", "/img/**","/scss/**","/vendor/**").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin((form) -> form
                        .loginPage("/login")
                        .permitAll()
                )
                .logout((logout) -> logout.permitAll());

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {  //  UserDetailsService là một interface trong Spring Security, chịu trách nhiệm tải thông tin người dùng cho quá trình xác thực (authentication).
        UserDetails user =
                User.withDefaultPasswordEncoder() //  một bộ mã hóa mật khẩu mặc định (default password encoder) để mã hóa mật khẩu dưới dạng chuỗi mã hóa (băm) để bảo mật tốt hơn.
                        .username("a@gmail.com")
                        .password("123")
                        .build();

        return new InMemoryUserDetailsManager(user); // InMemoryUserDetailsManager là một implementation của UserDetailsService lưu trữ người dùng trong bộ nhớ (in-memory).
    }
}
