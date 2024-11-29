package com.project.MedicalDiary.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.MedicalDiary.Entity.*;
import com.project.MedicalDiary.Service.Imp.*;
import com.project.MedicalDiary.Service.ImpInterface.ReceiptService;
import jakarta.servlet.http.HttpSession;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@Controller
@RequiredArgsConstructor
public class ScheduleController {

    @Autowired
    private ReceiptServiceImp rSe;

    @Autowired
    private FamilyServiceImp fSe;

    @Autowired
    private InformationServiceImp iSe;

    @Autowired
    private RoomServiceImp roSe;

    @Autowired
    private RoomDetailServiceImp rodeSe;

    @Autowired
    private AccountServiceImp accountServiceImp;

    @Autowired
    private ReceiptService receiptService;

    @GetMapping("/schedule")
    public String reicept(Authentication authentication, Model model, HttpSession session) {
        model.addAttribute("message", "Schedule");
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

        List<Information> listIf = iSe.findByFamily_IDFamily(idFamily);

        List<Receipt> listReceipt = new ArrayList<>();
        model.addAttribute("listReceipt", listReceipt);
        model.addAttribute("listIf", listIf);
        model.addAttribute("currentUrl", "/schedule");

        List<Receipt> listRemind = receiptService.findReceiptsWithinDateRange();

        model.addAttribute("listRemind", listRemind);

        model.addAttribute("familyName", account.getFamily().getName());

        Map<String, List<Information>> userInfoMap = (Map<String, List<Information>>) session.getAttribute("userInfoMap");

        if (userInfoMap == null) {
            userInfoMap = new HashMap<>();
        }

        model.addAttribute("listinfor", userInfoMap.values());
        model.addAttribute("name", session.getAttribute("name"));
        return "pages/fragments/schedule";
    }

    @PostMapping("/schedule")
    public String submitPin(@RequestParam("pin") String pin, @RequestParam("cccd") String cccd, HttpSession session) {
        Information ifor = iSe.getByCCCD(cccd);
        if (roSe.comparePin(pin, cccd)) {
            Map<String, List<Map<String, Object>>> userInfoMap = (Map<String, List<Map<String, Object>>>) session.getAttribute("userInfoMap");
            if (userInfoMap == null) {
                userInfoMap = new HashMap<>();
            }

            List<RoomDetail> members = rodeSe.getAllRoomDetailsByRoomID(cccd);
            List<Map<String, Object>> memberInfoList = new ArrayList<>();

            for (RoomDetail t : members) {
                Map<String, Object> memberInfo = new HashMap<>();
                System.out.println(t.getIsFollowed());
                memberInfo.put("info", t.getIsFollowed());
                memberInfo.put("name", ifor.getName());

                String randomColor = getRandomColor();
                memberInfo.put("color", randomColor);
                memberInfoList.add(memberInfo);
            }

            userInfoMap.put(cccd, memberInfoList);
            session.setAttribute("userInfoMap", userInfoMap);
        }
        return "redirect:/schedule";
    }
    private String getRandomColor() {
        Random random = new Random();
        int r = random.nextInt(256);
        int g = random.nextInt(256);
        int b = random.nextInt(256);
        return String.format("#%02x%02x%02x", r, g, b);
    }


    @PostMapping("/getReceiptInfo")
    public ResponseEntity<Receipt> getReceiptInfo(@RequestBody Map<String, String> request) {
        String groupId = request.get("groupId");
        Optional<Receipt> receiptOpt = rSe.getReceiptById(groupId);


            return ResponseEntity.ok(receiptOpt.orElse(null));

    }

    @PostMapping("/createCalendar")
    @ResponseBody
    public ResponseEntity<?> handleCheckboxUpdate(@RequestBody Map<String, Object> payload, HttpSession session) {
        List<String> selectedValues = (List<String>) payload.get("selectedValues");
        String action = (String) payload.get("action");
        String changedValue = (String) payload.get("changedValue");

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("selectedValues", selectedValues);

        List<Map<String, Object>> events = new ArrayList<>();
        List<Receipt> lRe = rSe.getListReceiptByIdPatient(changedValue);

        // Lấy userInfoMap từ session
        Map<String, List<Map<String, Object>>> userInfoMap = (Map<String, List<Map<String, Object>>>) session.getAttribute("userInfoMap");

        if ("add".equals(action)) {
            for (Receipt t : lRe) {
                // Tạo sự kiện chính (không phải follow-up)
                Map<String, Object> event = new HashMap<>();
                event.put("groupId", t.getIDReceipt());
                event.put("title", t.getReason());
                event.put("start", t.getDate().toString());
                event.put("followUp", false);  // Không phải sự kiện follow-up

                // Lấy màu từ session (dựa trên CCCD)
                String color = getColorForMember(changedValue, userInfoMap);
                event.put("color", color);  // Thêm màu vào sự kiện

                events.add(event);

                // Kiểm tra nếu có lịch hẹn follow-up
                LocalDateTime dateVisit = t.getDateVisit();
                if (dateVisit != null) {
                    // Tạo sự kiện follow-up
                    Map<String, Object> followUpEvent = new HashMap<>();
                    followUpEvent.put("groupId", t.getIDReceipt()); // Cùng groupId
                    followUpEvent.put("title", "Follow-up visit for: " + t.getReason());
                    followUpEvent.put("start", dateVisit.toString());
                    followUpEvent.put("followUp", true);  // Đây là sự kiện follow-up
                    followUpEvent.put("color", color);    // Thêm màu giống sự kiện chính

                    events.add(followUpEvent);
                }
            }
            response.put("events", events);
        } else if ("remove".equals(action)) {
            List<Long> idRes = new ArrayList<>();
            for (Receipt t : lRe) {
                Long temp = t.getIDReceipt();
                idRes.add(temp);
            }
            response.put("idRes", idRes);
        }
        return ResponseEntity.ok(response);
    }

    private String getColorForMember(String cccd, Map<String, List<Map<String, Object>>> userInfoMap) {
        if (userInfoMap != null) {
            for (List<Map<String, Object>> memberList : userInfoMap.values()) {
                for (Map<String, Object> member : memberList) {
                    Information info = (Information) member.get("info");
                    if (info.getCCCD().equals(cccd)) {
                        return (String) member.get("color");  // Trả về màu của thành viên
                    }
                }
            }
        }
        return "#000000";  // Màu mặc định nếu không tìm thấy
    }


}