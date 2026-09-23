package com.resumebackend.resume.controller;

import com.resumebackend.resume.dto.*;
import com.resumebackend.resume.entity.User;
import com.resumebackend.resume.entity.RefreshToken;
import com.resumebackend.resume.exception.BadRequestException;
import com.resumebackend.resume.security.JwtService;
import com.resumebackend.resume.service.RefreshTokenService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.resumebackend.resume.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody SignupReq req) {
        User user = authService.registerUser(req);
        return ResponseEntity.ok(user);

    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginReq req) {
        return authService.loginuser(req);


    }
    @GetMapping("/me")
    public  ResponseEntity<UserResponse>getCurrentUser(Authentication authentication){
        UserResponse userrespo=  authService.getCurrentuser(authentication.getName());
        return ResponseEntity.ok(userrespo);
    }
    @PutMapping("/change-password")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<String >changePassword(@Valid @RequestBody ChangePasswordReq req,Authentication authentication){
        authService.changePassword(authentication.getName(),req);
        return ResponseEntity.ok("Password changed successfully");
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(
            @RequestBody RefreshTokenRequest request) {

        try {

            RefreshToken refreshToken =
                    refreshTokenService.findByToken(
                            request.getRefreshToken()
                    );

            refreshTokenService.verifyExpiration(refreshToken);

            String newAccessToken =
                    jwtService.generateToken(
                            refreshToken.getUser().getEmail()
                    );

            return ResponseEntity.ok(
                    new LoginResponse(
                            newAccessToken,
                            refreshToken.getToken()
                    )
            );

        } catch (BadRequestException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logout(
            @RequestBody RefreshTokenRequest request) {

        try {

            RefreshToken refreshToken =
                    refreshTokenService.findByToken(
                            request.getRefreshToken()
                    );

            refreshTokenService.deleteByToken(
                    refreshToken.getToken()
            );

            return ResponseEntity.ok(
                    "Logged out successfully"
            );

        } catch (BadRequestException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @RequestBody ForgotPasswordReq req) {

         authService.forgotPassword(req.getEmail());

        return ResponseEntity.ok(
                "Password reset link sent to your email"
        );

    }


    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestBody ResetPasswordReq req) {

        authService.resetPassword(req);

        return ResponseEntity.ok(
                "Password reset successfully"
        );
    }
}


