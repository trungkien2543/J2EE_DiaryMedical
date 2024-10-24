package com.project.MedicalDiary.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.MedicalDiary.Service.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.Console;

@Controller
@RequiredArgsConstructor
//@RestController
@RequestMapping("/rooms")
public class RoomController {

    @GetMapping("")
    public String home(Authentication authentication,Model model) {
        model.addAttribute("message", "Rooms");
        model.addAttribute("currentUrl", "/rooms"); //Kiếm tra link hiện tại của web
        // Get the CustomUserDetails from the Authentication object

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        // Retrieve ID_Family
        long idFamily = userDetails.getID_Family();

        System.out.println(idFamily);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // Convert the Authentication object to JSON and print it
            String authJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(authentication);
            System.out.println(authJson);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "pages/fragments/rooms";
    }


}
