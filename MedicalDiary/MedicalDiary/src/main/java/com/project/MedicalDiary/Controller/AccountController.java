package com.project.MedicalDiary.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
public class AccountController {
    @GetMapping("/profile")
    public String Profile( Model model) {
        model.addAttribute("message", "Profile");
        return "pages/fragments/profile";
    }
    @GetMapping("/account-settings")
    public String AccountSettings( Model model) {
        model.addAttribute("message", "Account Settings");
        return "pages/fragments/account-settings";
    }
}
