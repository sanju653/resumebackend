package com.resumebackend.resume.controller;

import com.resumebackend.resume.dto.ExperienceReq;
import com.resumebackend.resume.dto.ExperienceResponse;
import com.resumebackend.resume.service.ExperienceService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resume/{resumeId}/experience")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class ExperienceController {

    private final ExperienceService experienceService;


    @PostMapping
    public ResponseEntity<ExperienceResponse> createExperience(@PathVariable Long resumeId,
            @Valid @RequestBody ExperienceReq req,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                experienceService.createExperience(resumeId,email, req)
        );
    }


    @GetMapping
    public ResponseEntity<List<ExperienceResponse>> getMyExperiences(@PathVariable Long resumeId,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                experienceService.getMyExperiences(resumeId,email)
        );
    }


    @PutMapping("/{id}")
    public ResponseEntity<ExperienceResponse> updateExperience(@PathVariable Long resumeId,
            @PathVariable Long id,
            @Valid @RequestBody ExperienceReq req,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                experienceService.updateExperience(resumeId,
                        id,
                        email,
                        req
                )
        );
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExperience(@PathVariable Long resumeId,
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        experienceService.deleteExperience(resumeId,id, email);

        return ResponseEntity.ok(
                "Experience deleted successfully"
        );
    }
}