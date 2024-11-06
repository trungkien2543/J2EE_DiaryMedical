package com.project.MedicalDiary.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.MedicalDiary.Entity.*;
import com.project.MedicalDiary.Service.*;
import com.project.MedicalDiary.Service.ImpInterface.*;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/getRoomDetailByID")
    @ResponseBody
    public ResponseEntity<?> getRoomDetailByID(@RequestBody RoomDetailId roomDetailId) {
        System.out.println("roomDetailId :  " + roomDetailId);
        Optional<RoomDetail> optionalRoomDetail = roomDetailService.findRoomDetailById(roomDetailId);
        if (optionalRoomDetail.isPresent()) {
            return ResponseEntity.ok(optionalRoomDetail.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("RoomDetail not found with ID: " + roomDetailId);
        }
    }

    @GetMapping("")
    public String room(Authentication authentication, Model model) {


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
        Iterable<Information> listInfoOfFml = informationService.findByFamily_IDFamily(idFamily);
        Map<Information, Room> memberRoomMap = roomService.mapRoomsToMembers(listInfoOfFml, listRoom);

        model.addAttribute("message", "Rooms");
        model.addAttribute("currentUrl", "/rooms"); //Kiếm tra link hiện tại của web
        model.addAttribute("memberRoomMap", memberRoomMap);
        model.addAttribute("listInfoOfFml", listInfoOfFml);
        // Get the CustomUserDetails from the Authentication object

        return "pages/fragments/rooms";
    }
    @GetMapping("/exitsByIDRoom")
    @ResponseBody
    public ResponseEntity<Boolean> existByIDRoom(@RequestParam("IDRoom") String IDRoom){
        boolean isPinValid = false;
        isPinValid = roomService.existByIDRoom(IDRoom);

        if (isPinValid) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }

    }
    @GetMapping("/checkInRoom")
    @ResponseBody
    public ResponseEntity<Boolean> checkInRoom(@RequestParam("IDRoom") String IDRoom){
        boolean isPinValid = false;
        isPinValid = roomDetailService.existsByRoom_IDRoom(IDRoom);

        if (isPinValid) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }

    }

    @DeleteMapping("deleteAll/{IDRoom}") //Delete detail room
    @ResponseBody
    public ResponseEntity<Boolean> deleteAll(@PathVariable String IDRoom){
        boolean isDelete = false;
        isDelete = roomDetailService.deleteAllByRoom_IDRoom(IDRoom);
        if (isDelete) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
    @DeleteMapping("deleteRoom/{idroom}")
    @ResponseBody
    public ResponseEntity<Boolean> deleteRoom(@PathVariable String idroom){
        boolean isDelete = false;
        isDelete = roomService.deleteRoomByIDRoom(idroom);
        if (isDelete) {
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.ok(false);
    }

    @RequestMapping(value = "/addRoom", method = {RequestMethod.POST, RequestMethod.PUT, RequestMethod.GET}
            , consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> createRoom(@Valid @RequestBody Room room) {
        System.out.println("Room add : ");
        System.out.println(room);
        boolean exists = roomService.existByIDRoom(room.getIDRoom());
        if (exists) {
            // Return a conflict status if the room already exists
            return new ResponseEntity<>("Room already exists", HttpStatus.CONFLICT);
        }
        if (room == null) {
            return ResponseEntity.badRequest().body("Room object is null");
        }

        // Save the room object to the database if it doesn't exist
        Room createdRoom = roomService.createRoom(room);

        // Return a response with the created room and a status code
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }

    @GetMapping("/checkRoom")
    @ResponseBody
    public ResponseEntity<Boolean> checkRoom(
            @RequestParam("IDRoom") String IDRoom,
            @RequestParam("PIN") String PIN,
            HttpSession session) {

        boolean isPinValid  = roomService.checkRoom(IDRoom, PIN);

        if (isPinValid) {
            // Save IDRoom to session
            session.setAttribute("IDRoom", IDRoom);
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
    @PutMapping("/changePIN")
    @ResponseBody
    public ResponseEntity<Boolean> changePIN(
            @RequestParam("IDRoom") String IDRoom,
            @RequestParam("oldPIN") String oldPIN,
            @RequestParam("newPIN") String newPIN) {

        boolean isPinValid  = roomService.changePIN(IDRoom, oldPIN, newPIN);

        if (isPinValid) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
     }

}