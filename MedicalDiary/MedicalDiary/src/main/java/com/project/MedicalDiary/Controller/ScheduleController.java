package com.project.MedicalDiary.Controller;

import com.project.MedicalDiary.Model.Receipt;
import com.project.MedicalDiary.Repository.FamilyReponsitory;
import com.project.MedicalDiary.Repository.ReceiptRepository;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor

public class ScheduleController {

    @Autowired
    private ReceiptRepository rRe;
    private FamilyReponsitory fRe;

    @GetMapping("/schedule")
    public String reicept( Model model) {
//        model.addAttribute("message", "Schedule");
        String idPatient= "112233445";
        List<Receipt> listReceipt= rRe.getListReceiptByIdPatient(idPatient);
        model.addAttribute("listReceipt",listReceipt);
        model.addAttribute("currentUrl", "/schedule"); //Kiếm tra link hiện tại của web
        return "pages/fragments/schedule";
    }

    @PostMapping("/getReceiptInfo")
    public ResponseEntity<Receipt> getReceiptInfo(@RequestBody Map<String, String> request) {
        String groupId = request.get("groupId");

        // Gọi service để lấy thông tin receipt dựa trên groupId
        Receipt receipt = rRe.getReceiptById(groupId);

        if (receipt != null) {
            // Tạo DTO để trả về dưới dạng JSON
            Receipt receiptDTO = new Receipt(receipt.getIdPatient(),receipt.getIdDoctor(), receipt.getPlace(), receipt.getDate());
            return ResponseEntity.ok(receiptDTO); // Trả về thông tin Receipt dưới dạng JSON
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Trả về lỗi nếu không tìm thấy receipt
        }
    }

    @PostMapping("/schedule")
    public String submitPin(@RequestParam("pin") String pin, Model model) {
        System.out.println("pin: "+pin);

        return "redirect:/schedule";
    }


}
