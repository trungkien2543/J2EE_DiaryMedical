package com.project.MedicalDiary.Controller;

import com.project.MedicalDiary.Model.Account;
import com.project.MedicalDiary.Repository.AccountRepository;
import com.project.MedicalDiary.Service.SendEmailService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

    @Autowired
    private AccountRepository accountRepository;


    // Gửi email
    @Autowired
    private SendEmailService sendEmailService;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String LoadData(Model model) {
        return "login.html";
    }

    @RequestMapping(value = "/forgot_password", method = RequestMethod.GET)
    public String LoadForgotPassword(Model model) {
        return "/pages/fragments/forgot_password";
    }

    @RequestMapping(value = "/reset_password", method = RequestMethod.GET)
    public String LoadResetPassword(Model model) {
        return "/pages/fragments/reset_password";
    }

    @RequestMapping(value = "/forgot_password", method = RequestMethod.POST)
    public String checkEmail(Model model, @RequestParam String email) {
        Account account = accountRepository.getAccountByUserName(email);

        if (account == null) {
            model.addAttribute("errorMessage", "Email này chưa được đăng kí trong hệ thống");
            return "/pages/fragments/forgot_password";  // Trả về trực tiếp trang forgot_password
        } else {

            try {
                sendEmailService.sendEmail("trungkien1862@gmail.com","1234324","Gift code");
                model.addAttribute("successMessage", "We will send code to your mail");
            } catch (MessagingException e) {
                model.addAttribute("errorMessage", "Lỗi gửi email vui lòng chờ");
            }

            return "/pages/fragments/forgot_password";  // Trả về trực tiếp trang forgot_password
        }
    }






}
