package com.project.MedicalDiary.Controller;

import com.project.MedicalDiary.Entity.Account;
import com.project.MedicalDiary.Entity.Family;
import com.project.MedicalDiary.Entity.Information;
import com.project.MedicalDiary.Service.Imp.AccountServiceImp;
import com.project.MedicalDiary.Service.Imp.FamilyServiceImp;
import com.project.MedicalDiary.Service.Imp.InformationServiceImp;
import com.project.MedicalDiary.Service.SendEmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Controller
public class LoginController {

    private long YourCode = 0;


    private Account account = null;


    private ArrayList<Information> familyMembers;

    @Autowired
    private AccountServiceImp accountServiceImp;

    @Autowired
    private InformationServiceImp informationServiceImp;

    @Autowired
    private FamilyServiceImp familyServiceImp;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Gửi email
    @Autowired
    private SendEmailService sendEmailService;




    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String LoadData(Model model) {
        return "login.html";
    }


    // Xu ly phan quen mat khau

    @RequestMapping(value = "/forgot_password", method = RequestMethod.GET)
    public String LoadForgotPassword(Model model) {
        return "/pages/fragments/forgot_password";
    }


    @RequestMapping(value = "/forgot_password", method = RequestMethod.POST)
    public String checkEmail(Model model, @RequestParam String email) {
        account = accountServiceImp.findByEmail(email).get();

        if (account == null) {
            model.addAttribute("errorMessage", "This email is not registered in the system");
            return "/pages/fragments/forgot_password";  // Trả về trực tiếp trang forgot_password
        } else {

            try {

                Random random = new Random();
                // Sinh số ngẫu nhiên trong khoảng từ 1000000 đến

                YourCode = 1000000 + random.nextInt(9000000);


                sendEmailService.sendEmail(account.getEmail(), Long.toString(YourCode), "Mã code để đổi mật khẩu");
                model.addAttribute("successMessage", "We will send code to your mail");
            } catch (MessagingException e) {
                model.addAttribute("errorMessage", "Error sending email, please wait");
            }

            return "/pages/fragments/forgot_password";  // Trả về trực tiếp trang forgot_password
        }
    }





    // Xu ly phan reset password

    @RequestMapping(value = "/reset_password", method = RequestMethod.GET)
    public String LoadResetPassword(Model model) {
        return "/pages/fragments/reset_password";
    }

    @RequestMapping(value = "/reset_password", method = RequestMethod.POST)
    public String checkPassword(Model model, @RequestParam String NewPassword, @RequestParam String PasswordConfirm, @RequestParam Long Code) {

        if (Code == YourCode) {
            if (PasswordConfirm.equals(NewPassword)) {

                model.addAttribute("successMessage", "We will send code to your mail");

                account.setPassword(passwordEncoder.encode(NewPassword));

                accountServiceImp.updateAccount(account);

            }
            else{
                model.addAttribute("errorMessage", "The 2 passwords are not the same");
            }
        }
        else {
            model.addAttribute("errorMessage", "The code is wrong");
        }


        return "/pages/fragments/reset_password";
    }


    // Xu ly phan dang ky tai khoan

    // Xu ly phan dang ky tai khoan

    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String LoadRegister(Model model) {

        ArrayList<Information> temp = (ArrayList<Information>) informationServiceImp.getAll();

        familyMembers = new ArrayList<>();


        // Kiểm tra xem dữ liệu có tồn tại không
        if (temp == null || temp.isEmpty()) {
            System.out.println("No data available in the list");
        } else {
            System.out.println("Data in list: " + temp);
        }



        model.addAttribute("list", temp);

        model.addAttribute("familyMemberList",familyMembers);

        return "register.html";

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

        // Tạo gia đình mới
        Family familyNew = familyServiceImp.createFamily(new Family(familyName));


        // Tạo tài khoản mới
        Account accountNew = accountServiceImp.createAccount(new Account(email,familyNew.getIDFamily(),passwordEncoder.encode(password)));

        //Thêm thanh viên mới

        for (Information member: familyMembers ) {
//            member.setIDFamily(familyNew.getIDFamily());
            informationServiceImp.createInformation(member);
        }


        model.addAttribute("familyMemberList",familyMembers);


        model.addAttribute("successMessage", "You can use this account for login");


        return "/register";
    }













}
