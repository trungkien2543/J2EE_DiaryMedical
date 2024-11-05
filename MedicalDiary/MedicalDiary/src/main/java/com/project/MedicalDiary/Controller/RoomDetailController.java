package com.project.MedicalDiary.Controller;

import com.project.MedicalDiary.DTO.InformationRequestDTO;
import com.project.MedicalDiary.DTO.RoomDetailRequestDTO;
import com.project.MedicalDiary.Entity.*;
import com.project.MedicalDiary.Service.ImpInterface.FamilyService;
import com.project.MedicalDiary.Service.ImpInterface.InformationService;
import com.project.MedicalDiary.Service.ImpInterface.RoomDetailService;
import com.project.MedicalDiary.Service.ImpInterface.RoomService;
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
import java.util.Optional;

@Controller
@RequiredArgsConstructor
//@RestController
@RequestMapping("/roomdetail")
public class RoomDetailController {
    private final InformationService informationService;
    private final FamilyService familyService;
    private final RoomDetailService roomDetailService;
    private final RoomService roomService;


    @GetMapping("")
    public String roomDetail(Authentication authentication, Model model, HttpSession session) {
        try {
            String roomId = (String) session.getAttribute("IDRoom");
            System.out.println(roomId);
            List<RoomDetail> roomDetails = roomDetailService.getAllRoomDetailsByRoomID(roomId);
            Information info = informationService.findByCCCD(roomId).get();
            List<Information> list = new ArrayList<>();
            for (RoomDetail roomDetail : roomDetails) {
                Optional<Information> obj = informationService.findByCCCD(roomDetail.getIsFollowed().getCCCD());
                //Add to list
                // Check if the Information object is present, then add it to the list
                obj.ifPresent(list::add);
            }
            List<RoomDetail> temps = roomDetailService.findByIsFollowed_CCCDAndStatus(roomId, 0);
            List<RoomDetailRequestDTO> pendingRequests = convertToDTOList(temps);

            model.addAttribute("info", info);
            model.addAttribute("IDRoom", roomId);
            model.addAttribute("list", list);
            model.addAttribute("message", "Room Detail");
            model.addAttribute("idFamily", "N/A");
            model.addAttribute("nameFamily", "Unknown Family");
            model.addAttribute("pendingRequests", pendingRequests);
            model.addAttribute("currentUrl", "/roomdetail");
        } catch (Exception e) {
            return "redirect:/rooms";
        }
        return "pages/fragments/RoomDetail";
    }
    public List<RoomDetailRequestDTO> convertToDTOList(List<RoomDetail> roomDetails) {
        List<RoomDetailRequestDTO> dtoList = new ArrayList<>();

        for (RoomDetail roomDetail : roomDetails) {
            RoomDetailRequestDTO dto = new RoomDetailRequestDTO();
            dto.setID(roomDetail.getID());
            dto.setRoom(roomDetail.getRoom());
            dto.setIsFollowed(roomDetail.getIsFollowed());
            dto.setStatus(roomDetail.getStatus());

            // Assuming Room has a getHouseOwner() method to retrieve the owner (Information)
            dto.setHouseOwner(informationService.findByCCCD(roomDetail.getRoom().getIDRoom()).get());

            dtoList.add(dto); // Convert and add to the list
        }

        return dtoList;// Collect results into a List
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
    public ResponseEntity<RoomDetail> createRoomDetail(@RequestBody InformationRequestDTO request, HttpSession session) {
        String roomId = (String) session.getAttribute("IDRoom");

        Information information = request.getInformation();
        Family family = request.getFamily();
        // Set the family object in information
        information.setFamily(family);

        RoomDetail roomDetail = new RoomDetail();
        RoomDetailId roomDetailId = new RoomDetailId();
        roomDetailId.setIDRoom(roomId);  // Set ID_Room part of the composite key
        roomDetailId.setIDisFollowed(information.getCCCD()); // Assuming CCCD maps to ID_IsFollowed
        roomDetail.setID(roomDetailId);
        Room roomtemp = roomService.getRoomByID(roomId);
        roomDetail.setRoom(roomtemp);
        roomDetail.setIsFollowed(information);
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
            informationService.updateIDFamilyToNull(id);
            return ResponseEntity.ok().body("Family member deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete family member.");
        }
    }
    @RequestMapping(value = "getRoomDetailByID",method = {RequestMethod.POST,RequestMethod.PUT ,RequestMethod.GET})
    @ResponseBody
    public ResponseEntity<?> getRoomDetailByID(@RequestBody RoomDetailId roomDetailId) {

//        System.out.println("roomDetailId :  " + request);
//        RoomDetailId roomDetailId = new RoomDetailId();
//        roomDetailId.setIDRoom(request.getIdroom());
//        roomDetailId.setIDisFollowed(request.getIdisFollowed());
        Optional<RoomDetail> optionalRoomDetail = roomDetailService.findRoomDetailById(roomDetailId);
        if (optionalRoomDetail.isPresent()) {
            return ResponseEntity.ok(optionalRoomDetail.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("RoomDetail not found with ID: " + roomDetailId);
        }
    }
    // New methods for accepting and canceling requests
    @RequestMapping(value = "acceptRequest",method = {RequestMethod.POST,RequestMethod.PUT ,RequestMethod.GET})
    @ResponseBody
    public ResponseEntity<String> acceptRequest(@RequestBody RoomDetail roomDetail, HttpSession session) {
        String roomId = (String) session.getAttribute("IDRoom");
//        String idIsFollowed = request.getCCCDAccept();
        System.out.println(roomDetail);
        try {
            roomDetailService.updateStatus(roomDetail.getID().getIDRoom(),  roomId, 1); // 1 for accepted
            return ResponseEntity.ok("Request accepted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to accept request.");
        }
    }

    @PostMapping("/cancelRequest")
    @ResponseBody
    public ResponseEntity<String> cancelRequest(@RequestBody String idIsFollowed,HttpSession session) {
        String roomId = (String) session.getAttribute("IDRoom");

        try {
            roomDetailService.updateStatus(roomId, idIsFollowed, -1); // -1 for canceled
            return ResponseEntity.ok("Request canceled successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to cancel request.");
        }
    }
    @GetMapping("/pendingRequest")
    @ResponseBody
    public ResponseEntity<List<RoomDetail>> pendingRequest(HttpSession session) {
        String idRoom = (String) session.getAttribute("IDRoom");
        // Fetch the list of RoomDetail entries with Status = 0 and the specified IDRoom
        List<RoomDetail> pendingRequests = roomDetailService.getPendingRequests(idRoom, 0);

        if (pendingRequests.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 No Content if no requests are found
        }

        return ResponseEntity.ok(pendingRequests);
    }


}
