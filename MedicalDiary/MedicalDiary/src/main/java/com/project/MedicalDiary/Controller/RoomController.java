package com.project.MedicalDiary.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
//@RestController
@RequestMapping("/rooms")
public class RoomController {
    @GetMapping("")
    public String home( Model model) {
        model.addAttribute("message", "Rooms");
        model.addAttribute("currentUrl", "/rooms"); //Kiếm tra link hiện tại của web
        return "pages/fragments/rooms";
    }
}
