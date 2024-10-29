package com.project.MedicalDiary.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.MedicalDiary.Entity.Family;
import com.project.MedicalDiary.Entity.Information;
import com.project.MedicalDiary.Entity.Room;
import com.project.MedicalDiary.Entity.RoomDetail;
import com.project.MedicalDiary.Service.CustomUserDetails;
import com.project.MedicalDiary.Service.ImpInterface.FamilyService;
import com.project.MedicalDiary.Service.ImpInterface.InformationService;
import com.project.MedicalDiary.Service.ImpInterface.RoomDetailService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
//@RestController
@RequestMapping("/roomdetail")
public class RoomDetailController {
    private final InformationService informationService;
    private final FamilyService familyService;
    private final RoomDetailService roomDetailService;


    @GetMapping("")
    public String roomDetail(Authentication authentication, Model model, HttpSession session) {
        String roomId = (String) session.getAttribute("IDRoom");

        List<RoomDetail> roomDetails =  roomDetailService.getAllRoomDetailsByRoomID(roomId);
        Information info = informationService.findByCCCD(roomId).get();
        List<Information> list = new ArrayList<>();
        for (RoomDetail roomDetail : roomDetails) {
            Optional<Information> obj =informationService.findByCCCD(roomDetail.getIDisFollowed());
            //Add to list
            // Check if the Information object is present, then add it to the list
            obj.ifPresent(list::add);
        }
        model.addAttribute("info", info);
        model.addAttribute("IDRoom", roomId);
        model.addAttribute("list",list);
        model.addAttribute("message", "Room Detail");
        model.addAttribute("idFamily", "N/A");
        model.addAttribute("nameFamily", "Unknown Family");
        return "pages/fragments/RoomDetail";
    }
    @GetMapping("/getDetail")
    @ResponseBody
    public ResponseEntity<Information> getDetail(@RequestParam String cccd) {
        System.out.println("Received CCCD: " + cccd); // Debugging log
        Optional<Information> informationOptional = informationService.findByCCCD(cccd);
        System.out.println("Information GETDETAIL: " + informationOptional.get());
        if (informationOptional.isPresent()) {
            return ResponseEntity.ok(informationOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @GetMapping("/getFamilyByID")
    @ResponseBody
    public ResponseEntity<Family> getFamilyByID(@RequestParam long iD_Family) {
        System.out.println("Received idFML: " + iD_Family); // Debugging log
        Optional<Family> familyOptional = familyService.findByID(iD_Family);

        if (familyOptional.isPresent()) {
            return ResponseEntity.ok(familyOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @RequestMapping(value = "/add",method = {RequestMethod.POST,RequestMethod.PUT ,RequestMethod.GET})
    @ResponseBody
    public ResponseEntity<RoomDetail> createRoomDetail(@RequestBody Information information, HttpSession session) {
        String roomId = (String) session.getAttribute("IDRoom");
        // Save the family object to the database
//        Information createdInformation = informationService.createInformation(information);
        RoomDetail roomDetail = new RoomDetail();
        roomDetail.setIDRoom(roomId);  // Assuming this is how you set roomId
        roomDetail.setIDisFollowed(information.getCCCD());
        System.out.println( "Room Detail : " + roomDetail);
        RoomDetail createdRoomDetail = roomDetailService.createRoomDetail(roomDetail);
        System.out.println("ADD Info : " + information); // Debugging log

        // Return a response with the created family and a status code
        return new ResponseEntity<>(createdRoomDetail, HttpStatus.CREATED);
    }

    @RequestMapping(value = "update",method = {RequestMethod.POST,RequestMethod.PUT ,RequestMethod.GET})
    @ResponseBody
    public ResponseEntity<Boolean> updateFamily(@RequestBody Information information) {
        boolean updateFamily = informationService.updateInformation(information);

        return new ResponseEntity<>(updateFamily, HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInf(@PathVariable String id) {
        try {
            informationService.deleteInformation(id);
            return ResponseEntity.ok().body("Family member deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete family member.");
        }
    }

}
