package com.project.MedicalDiary.Controller;

import lombok.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequiredArgsConstructor
public class FollowerController {

    @GetMapping("/follower")
    public String follower( Model model) {
        model.addAttribute("message", "Follower");
        return "pages/fragments/follower";
    }
}
