package com.resumebackend.resume.controller;

import com.resumebackend.resume.dto.SocialLinkReq;
import com.resumebackend.resume.dto.SocialLinkResponse;
import com.resumebackend.resume.service.SocialLinkService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resume/{resumeId}/social-links")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class SocialLinkController {

    private final SocialLinkService socialLinkService;


    // CREATE
    @PostMapping
    public ResponseEntity<SocialLinkResponse> createSocialLink(@PathVariable Long resumeId,
            @Valid @RequestBody SocialLinkReq req,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                socialLinkService.createSocialLink(resumeId,
                        email,
                        req
                )
        );
    }


    // GET
    @GetMapping
    public ResponseEntity<List<SocialLinkResponse>> getMySocialLinks(@PathVariable Long resumeId,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                socialLinkService.getMySocialLinks(resumeId,email)
        );
    }


    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<SocialLinkResponse> updateSocialLink(@PathVariable Long resumeId,
            @PathVariable Long id,
            @Valid @RequestBody SocialLinkReq req,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                socialLinkService.updateSocialLink(resumeId,
                        id,
                        email,
                        req
                )
        );
    }


    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSocialLink(@PathVariable Long resumeId,
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        socialLinkService.deleteSocialLink(resumeId,
                id,
                email
        );

        return ResponseEntity.ok(
                "Social link deleted successfully"
        );
    }
}