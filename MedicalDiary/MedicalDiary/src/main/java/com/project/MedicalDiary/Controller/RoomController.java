package com.project.MedicalDiary.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.MedicalDiary.Entity.*;
import com.project.MedicalDiary.Service.Imp.AccountServiceImp;
import com.project.MedicalDiary.Service.ImpInterface.*;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
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

    private final AccountServiceImp accountServiceImp;

    private final ReceiptService receiptService;

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
        // ádasidoa
        String email = "";

        // Do cơ chế lưu thông tin của mỗi authencaiton là khác nhau nên phải kiểm tra đó là loại nào để lấy cho phù hợp
        if (authentication instanceof OAuth2AuthenticationToken oauthToken) { // Sử dụng tài khoản google
            email = oauthToken.getPrincipal().getAttribute("email");
        } else if (authentication instanceof UsernamePasswordAuthenticationToken userPassToken) { // Sử dụng tài khoản
            email = userPassToken.getName();
        } else if (authentication instanceof RememberMeAuthenticationToken rememberMeToken) { // Sử dụng remember me
            email = rememberMeToken.getName(); // Lấy tên người dùng (username hoặc email)
        }

        if (email == null || email.isEmpty()) {
            System.out.println( "Unable to retrieve user email.");
            return "error";
        }

        // Lấy thông tin tài khoản dựa trên email
        Optional<Account> accountOpt = accountServiceImp.findByEmail(email);
        if (!accountOpt.isPresent()) {
            System.out.println( "Unable to retrieve user email.");
            return "error";
        }

        Account account = accountServiceImp.findByEmail(email).get();

        // Retrieve ID_Family
        Long idFamily = account.getFamily().getIDFamily();

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

        List<Receipt> listRemind = receiptService.findReceiptsWithinDateRange();

        model.addAttribute("listRemind", listRemind);

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