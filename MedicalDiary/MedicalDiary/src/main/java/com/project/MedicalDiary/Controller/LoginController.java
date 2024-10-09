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


        Account account = new Account(1L,"","");

        model.addAttribute("account", account);

        return "login.html";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String Login(Account account, Model model){
        System.out.println(account);

        Account account_temp = accountRepository.getAccountByUserName(account.getEmail());

        if (account_temp == null){
            model.addAttribute("errorMessage", "Tên đăng nhập không tồn tại");
            return "login.html";
        }
        else if (!account.getPassWord().equals(account_temp.getPassWord())) {
            model.addAttribute("errorMessage", "Mật khẩu bị sai");
            return "login.html";
        }
        return "redirect:/schedule";

    }

}
