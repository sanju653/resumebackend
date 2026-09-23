package com.resumebackend.resume.controller;

import com.resumebackend.resume.dto.UserResponse;
import com.resumebackend.resume.dto.UserUpdateReq;
import com.resumebackend.resume.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/me")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserResponse> getMyProfile(Authentication authentication){
        return ResponseEntity.ok(
                userService.getMyProfile(authentication.getName())
        );
    }
    @PutMapping
    public ResponseEntity<UserResponse>  updateMyProfile(@Valid @RequestBody UserUpdateReq req ,Authentication authentication){
        return ResponseEntity.ok(userService.updateMyProfile(req,authentication.getName()));
    }
    @DeleteMapping
    public ResponseEntity<String> deleteMyAccount(
            Authentication authentication) {

        userService.deleteMyAccount(authentication.getName());

        return ResponseEntity.ok("Account deleted successfully");
    }

}
