package com.resumebackend.resume.service;

import com.resumebackend.resume.dto.*;
import com.resumebackend.resume.entity.RefreshToken;
import com.resumebackend.resume.entity.User;
import com.resumebackend.resume.entity.PasswordResetToken;
import com.resumebackend.resume.exception.BadRequestException;
import com.resumebackend.resume.exception.ResourceNotFoundException;
import com.resumebackend.resume.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.resumebackend.resume.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final  UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final PasswordResetTokenService passwordResetTokenService;
    private final EmailService emailService;
//converting req obj into user obj bcoz DB has User entity not req entity

    public User registerUser(SignupReq req){
        if (!req.getPassword().equals(req.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }
        String encodedPassword=passwordEncoder.encode(req.getPassword());

        User user=User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(encodedPassword)
                .build();
        return userRepository.save(user);
    }

    public LoginResponse loginuser(LoginReq req){
        User user=userRepository.findByEmail(req.getEmail()).orElseThrow(()->new BadRequestException("Invalid email or Password"));

        if(!passwordEncoder.matches(req.getPassword(),user.getPassword())){
            throw new BadRequestException("Invalid email or password");

        }
        String accessToken = jwtService.generateToken(user.getEmail());
        RefreshToken refreshToken =
                refreshTokenService.createRefreshToken(user);
        return new LoginResponse(
                accessToken,
                refreshToken.getToken()
        );
    }
    public UserResponse getCurrentuser(String email){
        User user=userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not found"));

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getLocation()

        );

    }

    public void changePassword(String email, ChangePasswordReq req){
        User user=userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not found"));
        if(!passwordEncoder.matches(req.getOldPassword(), user.getPassword())) {
            throw new BadRequestException("Old password is incorrect");
        }
            user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);

        }

    public void forgotPassword(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new BadRequestException("User not found")
                );

        PasswordResetToken resetToken =
                passwordResetTokenService.createToken(user);
        String resetLink =
                "http://localhost:5173/reset-password?token="
                        + resetToken.getToken();
        emailService.sendPasswordResetEmail(
                user.getEmail(),
                resetLink
        );


    }


    public void resetPassword(ResetPasswordReq req) {

        PasswordResetToken resetToken =
                passwordResetTokenService.findByToken(req.getToken());

        if (passwordResetTokenService.isExpired(resetToken)) {

            passwordResetTokenService.deleteByToken(req.getToken());

            throw new BadRequestException("Reset token has expired");
        }

        User user = resetToken.getUser();

        user.setPassword(
                passwordEncoder.encode(req.getNewPassword())
        );

        userRepository.save(user);

        passwordResetTokenService.deleteByToken(req.getToken());
    }
    }


