package com.project.MedicalDiary.Controller;

import com.project.MedicalDiary.Entity.Account;
import com.project.MedicalDiary.Entity.Family;
import com.project.MedicalDiary.Entity.Information;
import com.project.MedicalDiary.Service.Imp.AccountServiceImp;
import com.project.MedicalDiary.Service.Imp.FamilyServiceImp;
import com.project.MedicalDiary.Service.Imp.InformationServiceImp;
import com.project.MedicalDiary.Service.OAuth.SendEmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Map;
import java.util.Random;

@Controller
public class LoginController {

    private long YourCode = 0;


    private Account account = null;


    @Autowired
    private AccountServiceImp accountServiceImp;



    @Autowired
    private PasswordEncoder passwordEncoder;

    // Gửi email
    @Autowired
    private SendEmailService sendEmailService;




    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String LoadData(Model model) {
        return "login.html";
    }


    // Xu ly phan quen mat khau

    @RequestMapping(value = "/forgot_password", method = RequestMethod.GET)
    public String LoadForgotPassword(Model model) {
        return "/pages/fragments/forgot_password";
    }


    @RequestMapping(value = "/forgot_password", method = RequestMethod.POST)
    public String checkEmail(Model model, @RequestParam String email) {
        account = accountServiceImp.findByEmail(email).get();

        if (account == null) {
            model.addAttribute("errorMessage", "This email is not registered in the system");
            return "/pages/fragments/forgot_password";  // Trả về trực tiếp trang forgot_password
        } else {

            try {

                Random random = new Random();
                // Sinh số ngẫu nhiên trong khoảng từ 1000000 đến

                YourCode = 1000000 + random.nextInt(9000000);


                sendEmailService.sendEmail(account.getEmail(), Long.toString(YourCode), "Code for reset password");
                model.addAttribute("successMessage", "We will send code to your mail");
            } catch (MessagingException e) {
                model.addAttribute("errorMessage", "Error sending email, please wait");
            }

            return "/pages/fragments/forgot_password";  // Trả về trực tiếp trang forgot_password
        }
    }





    // Xu ly phan reset password

    @RequestMapping(value = "/reset_password", method = RequestMethod.GET)
    public String LoadResetPassword(Model model) {
        return "/pages/fragments/reset_password";
    }

    @RequestMapping(value = "/reset_password", method = RequestMethod.POST)
    public String checkPassword(Model model, @RequestParam String NewPassword, @RequestParam String PasswordConfirm, @RequestParam Long Code) {

        if (Code == YourCode) {
            if (PasswordConfirm.equals(NewPassword)) {

                model.addAttribute("successMessage", "We will send code to your mail");

                account.setPassword(passwordEncoder.encode(NewPassword));

                accountServiceImp.updateAccount(account);

            }
            else{
                model.addAttribute("errorMessage", "The 2 passwords are not the same");
            }
        }
        else {
            model.addAttribute("errorMessage", "The code is wrong");
        }


        return "/pages/fragments/reset_password";
    }


    // Xu ly phan dang ky tai khoan

    // Xu ly phan dang ky tai khoan

















}
