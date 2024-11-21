package com.project.MedicalDiary.Controller;

import com.project.MedicalDiary.Entity.Account;
import com.project.MedicalDiary.Entity.Family;
import com.project.MedicalDiary.Service.Imp.AccountServiceImp;
import com.project.MedicalDiary.Service.Imp.FamilyServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class HomeController {

    private final AccountServiceImp accountServiceImp;

    @Autowired
    private FamilyServiceImp familyServiceImp;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/")
    public String home(Authentication authentication,Model model) {

        model.addAttribute("message", "Home");

        String email = "";

        String nameFamily = "";

        // Do cơ chế lưu thông tin của mỗi authencaiton là khác nhau nên phải kiểm tra đó là loại nào để lấy cho phù hợp
        if (authentication instanceof OAuth2AuthenticationToken oauthToken) { // Sử dụng tài khoản google
            email = oauthToken.getPrincipal().getAttribute("email");
            nameFamily = oauthToken.getPrincipal().getAttribute("name")+"'s Family";
        } else if (authentication instanceof UsernamePasswordAuthenticationToken userPassToken) { // Sử dụng tài khoản
            email = userPassToken.getName();
        } else if (authentication instanceof RememberMeAuthenticationToken rememberMeToken) { // Sử dụng remember me
            email = rememberMeToken.getName(); // Lấy tên người dùng (username hoặc email)
        }

        if (email == null || email.isEmpty()) {
            System.out.println( "Unable to retrieve user email.");
//            return "error";
        } else {
            System.out.printf("Email address: %s\n", email);
        }

        // Lấy thông tin tài khoản dựa trên email
        Optional<Account> accountOpt = accountServiceImp.findByEmail(email);
        if (!accountOpt.isPresent()) {
            // Tạo gia đình mới
            Family familyNew = familyServiceImp.createFamily(new Family(nameFamily));


            // Tạo tài khoản mới
            Account accountNew = accountServiceImp.createAccount(new Account(email,familyNew,passwordEncoder.encode("")));
        }


        return "pages/fragments/home";
    }




}
