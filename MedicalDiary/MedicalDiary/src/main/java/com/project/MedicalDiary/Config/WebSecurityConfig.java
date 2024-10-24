package com.project.MedicalDiary.Config;


import com.project.MedicalDiary.Service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    // Inject the custom UserDetailsService
    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }

    /*
     *  Phương thức này đăng ký một UserDetailsService dưới dạng một bean trong Spring container.
     *  UserDetailsService là một interface được Spring Security sử dụng để tải thông tin người dùng từ cơ sở dữ liệu hoặc từ nguồn lưu trữ nào đó.
     *
     * */

    // Use BCrypt password encoder

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


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
                .logout((logout) -> logout.permitAll())
                .rememberMe((rememberMe) -> rememberMe
                        .key("5bZUZjoAB21JT1gYRkfm")  // Khóa dùng để mã hóa cookie remember-me
                        .tokenValiditySeconds(86400)  // Thời gian hiệu lực của cookie (ở đây là 24 giờ)
                        .rememberMeParameter("remember-me")  // Tên tham số của checkbox "Remember Me"
                        .userDetailsService(userDetailsService())  // Thêm UserDetailsService cho Remember Me
                );
        return http.build();
    }



    /*
    *  Khi người dùng đăng ký tài khoản, mật khẩu của họ cần được mã hóa trước khi lưu vào cơ sở dữ liệu, để bảo vệ khỏi việc bị đánh cắp.
    *  Đồng thời, khi người dùng đăng nhập, mật khẩu mà họ nhập vào sẽ được mã hóa trước khi so sánh với mật khẩu đã mã hóa trong cơ sở dữ liệu.
    *
    *
    * */

    // Configure DaoAuthenticationProvider to use custom UserDetailsService and password encoder
    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }


    /*
    * userDetailsService(): Cung cấp cách lấy thông tin người dùng từ cơ sở dữ liệu.
        passwordEncoder(): Đảm bảo mật khẩu người dùng được mã hóa an toàn.
            authenticationProvider(): Tích hợp cả hai thành phần trên vào quá trình xác thực, đảm bảo rằng quá trình xác thực được thực hiện an toàn và chính xác thông qua việc so sánh mật khẩu đã mã hóa.
    *
    *
    * */



    //Cách hoạt động của tính năng "Remember Me"
    //Cookie remember-me:
    //Khi người dùng đánh dấu checkbox "Remember Me" và đăng nhập, Spring Security sẽ tạo ra một cookie (thường có tên là remember-me) và gửi cookie này đến trình duyệt của người dùng.
    //Cookie này chứa thông tin mã hóa (được mã hóa bằng khóa mà bạn đã định nghĩa trong cấu hình) để xác thực người dùng trong các lần truy cập sau.

    //Lưu trữ thông tin người dùng:
    //Thông tin người dùng không được lưu trữ trong cookie. Thay vào đó, cookie chứa một token (một chuỗi đại diện cho phiên làm việc) và một username.
    //Khi người dùng quay lại trang web và cookie remember-me có mặt, Spring Security sẽ sử dụng thông tin trong cookie để tìm kiếm thông tin người dùng trong hệ thống (thường thông qua UserDetailsService).
    //Xác thực:


    //Khi người dùng quay lại trang web và cookie remember-me có mặt, Spring Security sẽ:
    //Giải mã cookie để lấy thông tin như username.
    //Sử dụng UserDetailsService để tải thông tin người dùng từ cơ sở dữ liệu (hoặc nơi bạn đã cấu hình để lưu trữ người dùng).
    //Nếu người dùng tồn tại, Spring Security sẽ tạo một phiên làm việc mới cho họ mà không cần yêu cầu họ nhập lại thông tin đăng nhập.

}
