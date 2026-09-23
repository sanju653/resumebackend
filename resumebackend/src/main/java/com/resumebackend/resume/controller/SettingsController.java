package com.resumebackend.resume.controller;

import com.resumebackend.resume.dto.UserSettingsReq;
import com.resumebackend.resume.dto.UserSettingsResponse;
import com.resumebackend.resume.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SettingsController {

    private final SettingsService settingsService;


    @GetMapping
    public ResponseEntity<UserSettingsResponse> getSettings(
            Authentication authentication
    ) {

        return ResponseEntity.ok(
                settingsService.getSettings(authentication.getName())
        );
    }


    @PutMapping
    public ResponseEntity<UserSettingsResponse> updateSettings(
            @RequestBody UserSettingsReq req,
            Authentication authentication
    ) {

        return ResponseEntity.ok(
                settingsService.updateSettings(
                        authentication.getName(),
                        req
                )
        );
    }
}