package com.project.MedicalDiary.Controller;

import com.project.MedicalDiary.Model.Family;
import com.project.MedicalDiary.Model.Information;
import com.project.MedicalDiary.Repository.AccountRepository;
import com.project.MedicalDiary.Repository.FamilyReponsitory;
import com.project.MedicalDiary.Repository.InformationRepository;
import com.project.MedicalDiary.Service.CustomUserDetails;
import com.project.MedicalDiary.Service.Imp.FamilyServiceImp;
import com.project.MedicalDiary.Service.Imp.InformationServiceImp;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private InformationServiceImp informationServiceImp;
    @Autowired
    private FamilyServiceImp familyServiceImp;
    @GetMapping("")
    public String follower(Authentication authentication, Model model) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        // Retrieve ID_Family
        long idFamily = userDetails.getID_Family();

        Iterable<Information> list=informationServiceImp.findByIDFamily(idFamily);
        model.addAttribute("list",list);
        model.addAttribute("message", "Family");
        return "pages/fragments/family";
    }
    @GetMapping("/getDetail")
    @ResponseBody
    public ResponseEntity<Information> getDetail(@RequestParam String cccd) {
        System.out.println("Received id: " + cccd); // Debugging log
        Optional<Information> informationOptional = informationServiceImp.findByCCCD(cccd);

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
        Optional<Family> familyOptional = familyServiceImp.findByID(iD_Family);

        if (familyOptional.isPresent()) {
            return ResponseEntity.ok(familyOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @PostMapping
    Family CreateFamily(@RequestBody Family family) {

    }


}
