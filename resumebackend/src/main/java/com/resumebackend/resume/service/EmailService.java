package com.resumebackend.resume.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendPasswordResetEmail(String toEmail,String resetLink){
        SimpleMailMessage message=new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Reset your Resumate password");

        message.setText(
                "Hi,\n\n" +
                        "We received a request to reset your " +
                        "Resumate password.\n\n" +
                        "Click the link below to create a new password:\n\n" +
                        resetLink +
                        "\n\n" +
                        "This link will expire in 5 minutes.\n\n" +
                        "If you did not request this, you can safely ignore this email.\n\n" +
                        "Thanks,\n" +
                        "Resumate Team"
        );
        mailSender.send(message);

    }

}
