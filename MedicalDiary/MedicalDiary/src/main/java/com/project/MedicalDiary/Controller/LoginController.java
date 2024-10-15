package com.project.MedicalDiary.Controller;

import com.project.MedicalDiary.Model.Account;
import com.project.MedicalDiary.Repository.AccountRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LoginController {

    @Autowired
    private AccountRepository accountRepository;



    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String LoadData(Model model) {
        System.out.println("Login Page");
        return "login.html";
    }



}
