package com.project.MedicalDiary.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.ArrayIterator;
import com.project.MedicalDiary.Entity.Information;
import com.project.MedicalDiary.Entity.Room;
import com.project.MedicalDiary.Service.CustomUserDetails;
import com.project.MedicalDiary.Service.Imp.InformationService;
import com.project.MedicalDiary.Service.Imp.RoomDetailService;
import com.project.MedicalDiary.Service.Imp.RoomService;
import com.project.MedicalDiary.Service.RoomServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
//@RestController
@RequestMapping("/rooms")
public class RoomController {
    @Autowired
    private RoomService roomService;
    @Autowired
    private InformationService informationService;
    @Autowired
    private RoomDetailService roomDetailService;
    @GetMapping("")
    public String room(Authentication authentication,Model model) {


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
//        Iterable<Room> listRoom = roomService.getRoomByIDFamily(idFamily);
        List<Room> listRoom = roomService.getAll();
        Iterable<Information> listInfoOfFml =informationService.findByFamily_IDFamily(idFamily);
        Map<Information, Room> memberRoomMap = roomService.mapRoomsToMembers(listInfoOfFml, listRoom);

        model.addAttribute("message", "Rooms");
        model.addAttribute("currentUrl", "/rooms"); //Kiếm tra link hiện tại của web
        model.addAttribute("memberRoomMap", memberRoomMap);
        model.addAttribute("listInfoOfFml", listInfoOfFml);
        // Get the CustomUserDetails from the Authentication object

        return "pages/fragments/rooms";
    }
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        // Save the family object to the database
        Room createdRoom = roomService.createRoom(room);

        // Return a response with the created family and a status code
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }
}
