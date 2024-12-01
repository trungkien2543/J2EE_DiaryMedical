package com.project.MedicalDiary.Controller;

import com.project.MedicalDiary.Entity.Account;
import com.project.MedicalDiary.Entity.Information;
import com.project.MedicalDiary.Entity.Receipt;
import com.project.MedicalDiary.Service.Imp.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;
import java.util.*;

@Controller
@RequiredArgsConstructor
public class StatisticController {
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

    @GetMapping("/statistic")
    public String statistic(Authentication authentication, Model model) {
        String email = "";
        if (authentication instanceof OAuth2AuthenticationToken oauthToken) {
            email = oauthToken.getPrincipal().getAttribute("email");
        } else if (authentication instanceof UsernamePasswordAuthenticationToken userPassToken) {
            email = userPassToken.getName();
        } else if (authentication instanceof RememberMeAuthenticationToken rememberMeToken) {
            email = rememberMeToken.getName();
        }

        if (email == null || email.isEmpty()) {
            System.out.println("Unable to retrieve user email.");
            return "error";
        }

        Optional<Account> accountOpt = accountServiceImp.findByEmail(email);
        if (!accountOpt.isPresent()) {
            System.out.println("Unable to retrieve user account.");
            return "error";
        }

        Account account = accountOpt.get();
        Long idFamily = account.getFamily().getIDFamily();

        List<Information> listInfo = iSe.findByFamily_IDFamily(idFamily);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Information info : listInfo) {
            Map<String, Object> personData = new HashMap<>();
            personData.put("label", info.getName());

            // Random màu sắc
            String randomColor = String.format("#%06x", new Random().nextInt(0xffffff + 1));
            personData.put("borderColor", randomColor);

            // Đếm số lượng Receipt theo tháng và năm
            List<Receipt> listReceipts = rSe.getListReceiptByIdPatient(info.getCCCD());
            Map<Integer, int[]> yearData = new HashMap<>();

            for (Receipt receipt : listReceipts) {
                LocalDateTime date = receipt.getDate();
                int year = date.getYear();
                int month = date.getMonthValue();

                yearData.putIfAbsent(year, new int[12]);
                yearData.get(year)[month - 1]++;
            }

            // Thêm dữ liệu năm-tháng vào danh sách kết quả
            List<Map<String, Object>> datasets = new ArrayList<>();
            for (Map.Entry<Integer, int[]> entry : yearData.entrySet()) {
                Map<String, Object> dataset = new HashMap<>();
                dataset.put("year", entry.getKey());
                dataset.put("data", entry.getValue());
                datasets.add(dataset);
            }

            personData.put("datasets", datasets);
            result.add(personData);
        }

        model.addAttribute("statistics", result);
        List<Receipt> listRemind = rSe.findReceiptsWithinDateRange();

        model.addAttribute("listRemind", listRemind);

        model.addAttribute("familyName", account.getFamily().getName());
        return "pages/fragments/statistic";
    }


}
