package com.resumebackend.resume.service;

import com.resumebackend.resume.entity.RefreshToken;
import com.resumebackend.resume.entity.User;
import com.resumebackend.resume.exception.BadRequestException;
import com.resumebackend.resume.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    private final long refreshTokenDuration =
            7L * 24 * 60 * 60 * 1000;


    public RefreshToken createRefreshToken(User user) {

       // refreshTokenRepository.deleteByUserId(user.getId());

        RefreshToken refreshToken = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .user(user)
                .expiryDate(
                        Instant.now().plusMillis(refreshTokenDuration)
                )
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {

        if (token.getExpiryDate().isBefore(Instant.now())) {

            refreshTokenRepository.delete(token);

            throw new BadRequestException(
                    "Refresh token has expired"
            );
        }

        return token;
    }

    public void deleteByUserId(Long userId) {
        refreshTokenRepository.deleteByUserId(userId);
    }

    public RefreshToken findByToken(String token) {

        System.out.println("TOKEN RECEIVED BY BACKEND: [" + token + "]");
        return refreshTokenRepository.findByToken(token)
                .orElseThrow(() ->
                        new BadRequestException("Refresh token not found")
                );
    }
    public void deleteByToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }
}
