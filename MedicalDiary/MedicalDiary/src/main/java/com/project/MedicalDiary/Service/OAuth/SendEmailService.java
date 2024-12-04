package com.project.MedicalDiary.Service.OAuth;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class SendEmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.from}")
    private String from;


    public void sendEmail(String recipient,String code, String subject) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setFrom(from);
        helper.setTo(recipient);
        helper.setSubject(subject);

        String body = "<!DOCTYPE html>"
                + "<html lang=\"en\">"
                + "<head>"
                + "    <meta charset=\"UTF-8\">"
                + "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
                + "    <title>Email Template</title>"
                + "    <style>"
                + "        body { font-family: Arial, sans-serif; background-color: #f0f4f8; margin: 0; padding: 0; }"
                + "        .email-container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1); padding: 30px; text-align: center; }"
                + "        h2 { color: #333; font-size: 24px; margin-bottom: 15px; }"
                + "        p { color: #555; font-size: 16px; line-height: 1.5; margin: 10px 0; }"
                + "        .code-box { background-color: #e9f7fa; padding: 20px; border-radius: 8px; font-family: \"Courier New\", Courier, monospace; color: #2c3e50; font-size: 22px; border: 2px solid #3498db; margin: 20px 0; }"
                + "        .footer { margin-top: 20px; font-size: 12px; color: #777; }"
                + "        .footer a { color: #3498db; text-decoration: none; }"
                + "        .btn { background-color: #3498db; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; display: inline-block; margin-top: 15px; font-size: 16px; transition: background-color 0.3s; }"
                + "        .btn:hover { background-color: #2980b9; }"
                + "        .header { background-color: #3498db; color: white; padding: 20px; border-top-left-radius: 10px; border-top-right-radius: 10px; }"
                + "    </style>"
                + "</head>"
                + "<body>"
                + "    <div class=\"email-container\">"
                + "        <div class=\"header\">"
                + "            <h2>Your Verification Code</h2>"
                + "        </div>"
                + "        <p>Hello,</p>"
                + "        <p>Here is your verification code:</p>"
                + "        <div class=\"code-box\">"
                + "            <strong>" + code + "</strong>"
                + "        </div>"
                + "    </div>"
                + "</body>"
                + "</html>";



        // Thiết lập nội dung email với HTML
        helper.setText(body, true); // true để cho phép nội dung HTML

        mailSender.send(mimeMessage);
    }

    public void sendVerifyEmail(String recipient,String code, String subject) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setFrom(from);
        helper.setTo(recipient);
        helper.setSubject(subject);



        String body = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Email Verification</title>\n" +
                "    <style>\n" +
                "        body {\n" +
                "            font-family: Arial, sans-serif;\n" +
                "            background-color: #f0f4f8;\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "        }\n" +
                "        .container {\n" +
                "            max-width: 400px;\n" +
                "            margin: 50px auto;\n" +
                "            background-color: #ffffff;\n" +
                "            border-radius: 10px;\n" +
                "            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);\n" +
                "            padding: 30px;\n" +
                "            text-align: center;\n" +
                "        }\n" +
                "        h2 {\n" +
                "            color: #333;\n" +
                "            font-size: 24px;\n" +
                "            margin-bottom: 20px;\n" +
                "        }\n" +
                "        p {\n" +
                "            color: #555;\n" +
                "            font-size: 16px;\n" +
                "            line-height: 1.5;\n" +
                "            margin: 10px 0;\n" +
                "        }\n" +
                "        button {\n" +
                "            background-color: #3498db;\n" +
                "            color: white;\n" +
                "            padding: 12px 25px;\n" +
                "            border: none;\n" +
                "            border-radius: 5px;\n" +
                "            font-size: 16px;\n" +
                "            cursor: pointer;\n" +
                "            transition: background-color 0.3s;\n" +
                "        }\n" +
                "        button:hover {\n" +
                "            background-color: #2980b9;\n" +
                "        }\n" +
                "        .footer {\n" +
                "            margin-top: 20px;\n" +
                "            font-size: 12px;\n" +
                "            color: #777;\n" +
                "        }\n" +
                "        .footer a {\n" +
                "            color: #3498db;\n" +
                "            text-decoration: none;\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"container\">\n" +
                "        <h2>Email Verification</h2>\n" +
                "        <p>Please click \"Verify\" to confirm your email address:</p>\n" +
                "        <form action=\"http://localhost:8080/register\" method=\"GET\">\n" +
                "            <!-- Trường hidden chứa mã xác minh -->\n" +
                "            <input type=\"hidden\" name=\"verificationCode\" value=\""+ code +"\"> <!-- Thay giá trị bằng mã thực tế -->\n" +
                "            <button type=\"submit\">Verify</button>\n" +
                "        </form>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>\n";

        // Thiết lập nội dung email với HTML
        helper.setText(body, true); // true để cho phép nội dung HTML

        mailSender.send(mimeMessage);
    }

    public void sendCodeOTPChangePIN(String recipient, String otpCode) throws MessagingException {
        // Create a MIME message
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        // Set the sender, recipient, and subject
        helper.setFrom(from);
        helper.setTo(recipient);
        helper.setSubject("Your OTP Code for PIN Change");

        // HTML content for the email
        String body = "<!DOCTYPE html>"
                + "<html lang=\"en\">"
                + "<head>"
                + "    <meta charset=\"UTF-8\">"
                + "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
                + "    <title>OTP for PIN Change</title>"
                + "    <style>"
                + "        body { font-family: Arial, sans-serif; background-color: #f8f9fa; margin: 0; padding: 0; }"
                + "        .email-container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); padding: 20px; text-align: center; }"
                + "        .header { background-color: #4caf50; color: #ffffff; padding: 15px; border-radius: 8px 8px 0 0; font-size: 18px; }"
                + "        .content { padding: 20px; color: #333; font-size: 16px; line-height: 1.6; }"
                + "        .otp-box { background-color: #e8f5e9; padding: 15px; border-radius: 5px; font-family: \"Courier New\", Courier, monospace; color: #2e7d32; font-size: 20px; font-weight: bold; border: 1px solid #81c784; margin: 20px auto; display: inline-block; }"
                + "        .footer { font-size: 12px; color: #777; margin-top: 20px; }"
                + "        .footer a { color: #4caf50; text-decoration: none; }"
                + "    </style>"
                + "</head>"
                + "<body>"
                + "    <div class=\"email-container\">"
                + "        <div class=\"header\">"
                + "            PIN Change Verification Code"
                + "        </div>"
                + "        <div class=\"content\">"
                + "            <p>Dear User,</p>"
                + "            <p>You requested to change your PIN. Please use the following OTP code to proceed:</p>"
                + "            <div class=\"otp-box\">" + otpCode + "</div>"
                + "            <p>This OTP is valid for the next 10 minutes. If you did not request this, please ignore this email.</p>"
                + "        </div>"
                + "        <div class=\"footer\">"
                + "            <p>Thank you,</p>"
                + "            <p>The Secure Team</p>"
                + "        </div>"
                + "    </div>"
                + "</body>"
                + "</html>";

        // Set the HTML content for the email
        helper.setText(body, true);

        // Send the email
        mailSender.send(mimeMessage);
    }



}
