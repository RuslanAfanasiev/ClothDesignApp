package in.afanasievruslan.authify.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    private final TemplateEngine templateEngine;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromMail;

    public void sendWelcomeEmail(String toEmail, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromMail);
        message.setTo(toEmail);
        message.setSubject("Welcome to our platform");
        message.setText("Hello, " + name + "\n\nThanks for registering!");
        mailSender.send(message);
    }

//    public void sendResetOtpEmail(String toEmail, String otp) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom(fromMail);
//        message.setTo(toEmail);
//        message.setSubject("Password reset OTP");
//        message.setText("Your OTP for resetting your password is " + otp + ". Use this OTP to proceed with resetting your password.");
//        mailSender.send(message);
//    }
//
//    public void sendOtpEmail(String toEmail, String otp) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom(fromMail);
//        message.setTo(toEmail);
//        message.setSubject("Account verification OTP");
//        message.setText("Your OTP is " + otp + ". Use this OTP to proceed with verification OTP.");
//        mailSender.send(message);
//    }

    public void sendOtpEmail(String toEmail, String otp) throws MessagingException {
        Context context = new Context();
        context.setVariable("email", toEmail);
        context.setVariable("otp", otp);

        String process = templateEngine.process("verify-email", context);
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

        helper.setFrom(fromMail);
        helper.setTo(toEmail);
        helper.setSubject("Account Verification OTP");
        helper.setText(process, true);

        mailSender.send(mimeMessage);
    }
    public void sendResetOtpEmail(String toEmail, String otp) throws MessagingException {
        Context context = new Context();
        context.setVariable("email", toEmail);
        context.setVariable("otp", otp);

        String process = templateEngine.process("password-reset-email", context);
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

        helper.setFrom(fromMail);
        helper.setTo(toEmail);
        helper.setSubject("Forgot your password");
        helper.setText(process, true);

        mailSender.send(mimeMessage);
    }

}
