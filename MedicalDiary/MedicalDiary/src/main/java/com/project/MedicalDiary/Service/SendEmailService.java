package com.project.MedicalDiary.Service;

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
}
