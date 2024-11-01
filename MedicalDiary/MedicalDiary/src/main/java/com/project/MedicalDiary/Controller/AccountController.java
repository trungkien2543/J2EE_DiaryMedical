package com.project.MedicalDiary.Controller;

import com.project.MedicalDiary.Service.ImpInterface.AccountService;
import com.project.MedicalDiary.Service.ImpInterface.FamilyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping("/profile")
    public String Profile(Model model) {
        model.addAttribute("message", "Profile");
        return "pages/fragments/profile";
    }

    @GetMapping("/change-password")
    public String AccountSettings(Model model) {
        model.addAttribute("message", "Change Password");
        return "pages/fragments/change-password";
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");
        String confirmPassword = request.get("confirmPassword");

        if (!newPassword.equals(confirmPassword)) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "New password and confirm password do not match."));
        }

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        boolean isPasswordChanged = accountService.changePassword(email, oldPassword, newPassword);

        if (!isPasswordChanged) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Incorrect old password."));
        }

        return ResponseEntity.ok(Map.of("success", true, "message", "Password changed successfully."));
    }
}
