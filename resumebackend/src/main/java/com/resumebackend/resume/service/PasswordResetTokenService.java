package com.resumebackend.resume.service;

import com.resumebackend.resume.entity.PasswordResetToken;
import com.resumebackend.resume.entity.User;
import com.resumebackend.resume.repository.PasswordResetTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetTokenService {

    private final PasswordResetTokenRepository tokenRepository;

    public PasswordResetToken createToken(User user) {

        PasswordResetToken resetToken = new PasswordResetToken();

        resetToken.setToken(UUID.randomUUID().toString());

        resetToken.setUser(user);

        resetToken.setExpiryDate(
                LocalDateTime.now().plusMinutes(5)
        );

        return tokenRepository.save(resetToken);
    }

    public PasswordResetToken findByToken(String token) {

        return tokenRepository.findByToken(token)
                .orElseThrow(() ->
                        new RuntimeException("Invalid reset token")
                );
    }

    public boolean isExpired(PasswordResetToken resetToken) {

        return resetToken.getExpiryDate()
                .isBefore(LocalDateTime.now());
    }

    public void deleteByToken(String token) {

        tokenRepository.deleteByToken(token);
    }
}