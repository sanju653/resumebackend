package com.resumebackend.resume.controller;

import com.resumebackend.resume.dto.CertificationReq;
import com.resumebackend.resume.dto.CertificationResponse;
import com.resumebackend.resume.service.CertificationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resume/{resumeId}/certifications")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class CertificationController {

    private final CertificationService certificationService;

    // CREATE
    @PostMapping
    public ResponseEntity<CertificationResponse> createCertification(@PathVariable Long resumeId,
            @Valid @RequestBody CertificationReq req,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                certificationService.createCertification(resumeId,email, req)
        );
    }

    // GET MY CERTIFICATIONS
    @GetMapping
    public ResponseEntity<List<CertificationResponse>> getMyCertifications(@PathVariable Long resumeId,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                certificationService.getMyCertifications(resumeId,email)
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<CertificationResponse> updateCertification(@PathVariable Long resumeId,
            @PathVariable Long id,
            @Valid @RequestBody CertificationReq req,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                certificationService.updateCertification(resumeId,
                        id,
                        email,
                        req
                )
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCertification(@PathVariable Long resumeId,
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        certificationService.deleteCertification(resumeId,id, email);

        return ResponseEntity.ok(
                "Certification deleted successfully"
        );
    }
}