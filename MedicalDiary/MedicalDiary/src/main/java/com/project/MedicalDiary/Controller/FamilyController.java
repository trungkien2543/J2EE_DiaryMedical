package com.project.MedicalDiary.Controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.MedicalDiary.DTO.InformationRequestDTO;
import com.project.MedicalDiary.Entity.Account;
import com.project.MedicalDiary.Entity.Family;
import com.project.MedicalDiary.Entity.Information;
import com.project.MedicalDiary.Entity.Receipt;
import com.project.MedicalDiary.Service.Cloudinary.CloudinaryService;
import com.project.MedicalDiary.Service.Imp.AccountServiceImp;
import com.project.MedicalDiary.Service.ImpInterface.FamilyService;
import com.project.MedicalDiary.Service.ImpInterface.InformationService;
import com.project.MedicalDiary.Service.ImpInterface.ReceiptService;
import jakarta.validation.Valid;
import lombok.*;
import org.aspectj.lang.annotation.RequiredTypes;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
//@RestController
@RequestMapping("/family")
public class FamilyController {

    private final InformationService informationService;

    private final FamilyService familyService;

    private final ReceiptService receiptService;

    private final ObjectMapper objectMapper;

    private final CloudinaryService cloudinaryService;

    private final AccountServiceImp accountServiceImp;

    @GetMapping("")
    public String follower(Authentication authentication, Model model) {

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
        String nameFamily = familyService.findByID(idFamily).get().getName();

        Iterable<Information> list =informationService.findByFamily_IDFamily(idFamily);
        model.addAttribute("list",list);
        model.addAttribute("message", "Family");
        model.addAttribute("idFamily", idFamily);
        model.addAttribute("nameFamily", nameFamily);

        List<Receipt> listRemind = receiptService.findReceiptsWithinDateRange();

        model.addAttribute("listRemind", listRemind);

        model.addAttribute("familyName", nameFamily);

        return "pages/fragments/family";
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

//    @RequestMapping(value = "/add",method = {RequestMethod.POST,RequestMethod.PUT ,RequestMethod.GET})
//    @ResponseBody
//    public ResponseEntity<Information> createInformation(@RequestBody Information information) {
//        // Save the family object to the database
//        Information createdInformation = informationService.createInformation(information);
//        System.out.println("ADD Info : " + information); // Debugging log
//
//        // Return a response with the created family and a status code
//        return new ResponseEntity<>(createdInformation, HttpStatus.CREATED);
//    }


    @RequestMapping(value = "/add", method = {RequestMethod.POST, RequestMethod.PUT, RequestMethod.GET}
            , consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Information> createInformation(@RequestBody @Valid InformationRequestDTO request) {
        Information information = request.getInformation();
        Family family = request.getFamily();

        // Set the family object in information
        information.setFamily(family);

        // Save the information object with the family data to the database
        Information createdInformation = informationService.createInformation(information);
        System.out.println("ADD Info : " + information); // Debugging log

        // Return a response with the created information and a status code
        return new ResponseEntity<>(createdInformation, HttpStatus.CREATED);
    }



    @RequestMapping(value = "update",method = {RequestMethod.POST,RequestMethod.PUT ,RequestMethod.GET})
    @ResponseBody
    public ResponseEntity<Boolean> updateFamily(@RequestBody InformationRequestDTO request) {
        Information information = request.getInformation();
        Family family = request.getFamily();
        // Set the family object in information
        information.setFamily(family);
        boolean updateFamily = informationService.updateInformation(information);
        System.out.println("Update Info : " + information); // Debugging log

        return new ResponseEntity<>(updateFamily, HttpStatus.CREATED);
    }



    @PutMapping("/{id}")
    public ResponseEntity<?> deleteFamily(@PathVariable String id) {
        try {
//            informationService.deleteInformation(id);
            // Set IDFamily to null before deleting the information
            informationService.updateIDFamilyToNull(id);
            return ResponseEntity.ok().body("Family member deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete family member.");
        }
    }
    //Write rest api to check information exist by CCCD and IDFamily != null
    @GetMapping("/existsByCCCDAndFamily_IDFamilyNotNull")
    @ResponseBody
    public ResponseEntity<Boolean> existsByCCCDAndFamily_IDFamilyNotNull(@RequestParam String cccd) {
        System.out.println("Received CCCD: " + cccd); // Debugging log
        boolean exists = informationService.existsByCCCDAndFamily_IDFamilyNotNull(cccd);
        return ResponseEntity.ok(exists);
    }



    //Write rest api to check information exist by CCCD and IDFamily == null
    @GetMapping("/existsByCCCDAndFamily_IDFamilyNull")
    @ResponseBody
    public ResponseEntity<Boolean> existsByCCCDAndFamily_IDFamilyNull(@RequestParam String cccd) {
        System.out.println("Received CCCD: " + cccd); // Debugging log
        boolean exists = informationService.existsByCCCDAndFamily_IDFamilyNull(cccd);
        return ResponseEntity.ok(exists);
    }


    @GetMapping("/existsByCCCD")
    @ResponseBody
    public ResponseEntity<Boolean> existsByCCCD(@RequestParam String cccd) {
        System.out.println("Received CCCD: " + cccd); // Debugging log
        boolean exists = informationService.existsByCCCD(cccd);
        return ResponseEntity.ok(exists);
    }




    // Them rceipt vao
    @RequestMapping(value = "/addReceipt",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> addReceipt(@RequestParam(value = "fileResult", required = false) MultipartFile fileResult,
                                              @RequestParam(value = "fileBill",required = false) MultipartFile fileBill,
                                              @RequestParam("receipt") String receiptJson) {

        System.out.println("Received receipt: " + receiptJson);



        // Xử lý file và đối tượng Receipt
        // Ví dụ: Lưu file vào thư mục
        try {
//          // Chuyển chuỗi JSON thành đối tượng Receipt
            Receipt receipt = objectMapper.readValue(receiptJson, Receipt.class);

            if (fileResult != null && !fileResult.isEmpty()) {
                Map<String, String> dataResult = this.cloudinaryService.upLoadFile(fileResult);
                System.out.println(dataResult);
                receipt.setUrlResult(dataResult.get("url"));
            }

            if (fileBill != null && !fileBill.isEmpty()) {
                Map<String, String> dataBill = this.cloudinaryService.upLoadFile(fileBill);
                System.out.println(dataBill);
                receipt.setUrlBill(dataBill.get("url"));
            }


            System.out.println(receipt);

            receiptService.createReceipt(receipt);


            return ResponseEntity.ok("Receipt added successfully.");


        } catch (Exception e) {
            // Xử lý lỗi khi xử lý file
            return ResponseEntity.status(400).body("Failed to process the receipt: " + e.getMessage());
        }


    }
}
