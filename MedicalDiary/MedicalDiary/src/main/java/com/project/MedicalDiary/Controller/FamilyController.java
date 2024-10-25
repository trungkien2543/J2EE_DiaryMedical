package com.project.MedicalDiary.Controller;

import com.project.MedicalDiary.Entity.Family;
import com.project.MedicalDiary.Entity.Information;
import com.project.MedicalDiary.Service.CustomUserDetails;
import com.project.MedicalDiary.Service.Imp.FamilyService;
import com.project.MedicalDiary.Service.Imp.InformationService;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
//@RestController
@RequestMapping("/family")
public class FamilyController {

    private final InformationService informationService;
    private final FamilyService familyService;

    @GetMapping("")
    public String follower(Authentication authentication, Model model) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        // Retrieve ID_Family
        Long idFamily = userDetails.getID_Family();
        String nameFamily = familyService.findByID(idFamily).get().getName();

        Iterable<Information> list =informationService.findByFamily_IDFamily(idFamily);
        model.addAttribute("list",list);
        model.addAttribute("message", "Family");
        model.addAttribute("idFamily", idFamily);
        model.addAttribute("nameFamily", nameFamily);
        return "pages/fragments/family";
    }
    @GetMapping("/getDetail")
    @ResponseBody
    public ResponseEntity<Information> getDetail(@RequestParam String cccd) {
        System.out.println("Received id: " + cccd); // Debugging log
        Optional<Information> informationOptional = informationService.findByCCCD(cccd);

        if (informationOptional.isPresent()) {
            return ResponseEntity.ok(informationOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @GetMapping("/getFamilyByID")
    @ResponseBody
    public ResponseEntity<Family> getFamilyByID(@RequestParam long iD_Family) {
        System.out.println("Received id: " + iD_Family); // Debugging log
        Optional<Family> familyOptional = familyService.findByID(iD_Family);

        if (familyOptional.isPresent()) {
            return ResponseEntity.ok(familyOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
//    @RequestMapping(value = "/add",method = {RequestMethod.POST,RequestMethod.PUT ,RequestMethod.GET})
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Information> createInformation(@RequestBody Information information) {
        // Save the family object to the database
        Information createdInformation = informationService.createInformation(information);

        // Return a response with the created family and a status code
        return new ResponseEntity<>(createdInformation, HttpStatus.CREATED);
    }

    @RequestMapping(value = "update",method = {RequestMethod.POST,RequestMethod.PUT ,RequestMethod.GET})
    @ResponseBody
    public ResponseEntity<Boolean> updateFamily(@RequestBody Information information) {
        boolean updateFamily = informationService.updateInformation(information);

        return new ResponseEntity<>(updateFamily, HttpStatus.CREATED);
    }


}
