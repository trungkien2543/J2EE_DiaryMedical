package com.project.MedicalDiary.Controller;

import com.project.MedicalDiary.Entity.Account;
import com.project.MedicalDiary.Entity.Family;
import com.project.MedicalDiary.Entity.Information;
import com.project.MedicalDiary.Service.Imp.AccountServiceImp;
import com.project.MedicalDiary.Service.Imp.FamilyServiceImp;
import com.project.MedicalDiary.Service.Imp.InformationServiceImp;
import com.project.MedicalDiary.Service.OAuth.SendEmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Map;
import java.util.Random;

@Controller
public class RegisterController {

    private Long codeRandom = 0L;

    String familyName, email, password;

    private ArrayList<Information> familyMembers;

    @Autowired
    private InformationServiceImp informationServiceImp;

    @Autowired
    private FamilyServiceImp familyServiceImp;

    @Autowired
    private AccountServiceImp accountServiceImp;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Gửi email
    @Autowired
    private SendEmailService sendEmailService;




    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String LoadRegister(@RequestParam(value = "verificationCode", required = false) Long codeFromMail,Model model) {

        if (codeFromMail != null) {

            if (codeFromMail.equals(codeRandom)) {
                // Tạo gia đình mới
                Family familyNew = familyServiceImp.createFamily(new Family(familyName));


                // Tạo tài khoản mới
                Account accountNew = accountServiceImp.createAccount(new Account(email,familyNew,passwordEncoder.encode(password)));

                //Thêm thanh viên mới

                for (Information member: familyMembers ) {
                    member.setFamily(familyNew);
                    informationServiceImp.createInformation(member);
                }

                model.addAttribute("successMessage", "Your account has been created successfully");

                codeRandom = 0L;

                familyMembers = new ArrayList<>();

                familyName = "";

                email = "";

                password = "";

            }else{
                System.out.println(codeFromMail+ " " + codeRandom);
                model.addAttribute("errorMessage", "Your request has expired");
            }
            return "login";

        } else {
            ArrayList<Information> temp = (ArrayList<Information>) informationServiceImp.getAll();

            familyMembers = new ArrayList<>();


            // Kiểm tra xem dữ liệu có tồn tại không
            if (temp == null || temp.isEmpty()) {
                System.out.println("No data available in the list");
            } else {
                System.out.println("Data in list: " + temp);
            }

            model.addAttribute("list", temp);

            model.addAttribute("familyMemberList", familyMembers);

            return "register.html";
        }


    }



    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String register(@RequestParam Map<String, String> allParams, @RequestParam String familyName,
                           @RequestParam String email,
                           @RequestParam String password,
                           @RequestParam String repeatPassword, Model model) {


        // reset family members
        familyMembers = new ArrayList<>();


        // Assuming you know the keys pattern
        int index = 0;
        while (allParams.containsKey("familyMembers[" + index + "].cccd")) {
            Information member = new Information();
            member.setCCCD(allParams.get("familyMembers[" + index + "].cccd"));
            member.setName(allParams.get("familyMembers[" + index + "].name"));
            member.setGender(Boolean.valueOf(allParams.get("familyMembers[" + index + "].gender")));
            member.setBHYT(allParams.get("familyMembers[" + index + "].bhyt"));
            member.setPhone(allParams.get("familyMembers[" + index + "].phone"));
            member.setJob(allParams.get("familyMembers[" + index + "].job"));
            member.setDepartment(allParams.get("familyMembers[" + index + "].department"));
            member.setAddress(allParams.get("familyMembers[" + index + "].address"));
            member.setMedicalHistory(allParams.get("familyMembers[" + index + "].medicalHistory"));

            familyMembers.add(member);
            index++;
        }


        System.out.println(email + " " + password + " " + repeatPassword + " " + familyName);


        if (!repeatPassword.equals(password)) {
            model.addAttribute("errorMessage", "The 2 passwords are not the same");

            model.addAttribute("familyMemberList",familyMembers);
            return "/register";
        }



        if(accountServiceImp.findByEmail(email).isPresent()) {
            model.addAttribute("errorMessage", "Email that was used to sign up for another account");

            model.addAttribute("familyMemberList",familyMembers);
            return "/register";
        }


        try {
            Random random = new Random();
            // Sinh số ngẫu nhiên trong khoảng từ 1000000 đến

            codeRandom = 1000000 + random.nextLong(9000000);


            sendEmailService.sendVerifyEmail(email, Long.toString(codeRandom), "Verify Email");
            model.addAttribute("successMessage", "We will send mail to your mail");
        } catch (MessagingException e) {
            model.addAttribute("errorMessage", "Error sending email, please wait");
        }


        this.familyName = familyName;

        this.email = email;

        this.password = password;


        model.addAttribute("familyMemberList",familyMembers);


//        model.addAttribute("successMessage", "You can use this account for login");


        return "/register";
    }
}
