package com.project.MedicalDiary.Controller;

import com.project.MedicalDiary.Entity.Receipt;
import com.project.MedicalDiary.Service.Imp.ReceiptServiceImp;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ScheduleController {

    @Autowired
    private ReceiptServiceImp rRe;

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
        //HUYNH QUOC TIEN
//        Receipt receipt = rRe.getReceiptById(groupId).get();
        Receipt receipt = rRe.getReceiptById(groupId).get();

        if (receipt != null) {
            // Tạo DTO để trả về dưới dạng JSON
//            HUYNH QUOC TIEN
//            Receipt receiptDTO = new Receipt(receipt.getIdPatient(),receipt.getIdDoctor(), receipt.getPlace(), receipt.getDate());
            Receipt receiptDTO = new Receipt(receipt.getPatient(),receipt.getDoctor(), receipt.getPlace(), receipt.getDate());
            return ResponseEntity.ok(receiptDTO); // Trả về thông tin Receipt dưới dạng JSON
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Trả về lỗi nếu không tìm thấy receipt
        }
    }
}
