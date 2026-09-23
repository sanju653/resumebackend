package com.resumebackend.resume.controller;

import com.resumebackend.resume.dto.EducationReq;
import com.resumebackend.resume.dto.EducationRespo;
import com.resumebackend.resume.service.EducationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resume/{resumeId}/education")
@RequiredArgsConstructor
@SecurityRequirement(name="bearerAuth")
public class EducationController {

    private final EducationService educationService;
    @PostMapping
    public ResponseEntity<EducationRespo>createEducation(  @PathVariable Long resumeId,@Valid @RequestBody EducationReq req, Authentication authentication){
      return ResponseEntity.ok(educationService.createEducation( resumeId,authentication.getName(), req));
    }
    @GetMapping
    public ResponseEntity<List<EducationRespo>>getMyAllEducations( @PathVariable Long resumeId,Authentication authentication){
        return ResponseEntity.ok(educationService.getMyEducation(  resumeId,authentication.getName()));
    }
    @PutMapping("/{id}")
    public ResponseEntity<EducationRespo> updateEducation(
            @PathVariable Long resumeId,
            @PathVariable Long id,
            @Valid @RequestBody EducationReq req,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                educationService.updateEducation(resumeId,
                        id, email, req)
        );
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEducation(
            @PathVariable Long resumeId,
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        educationService.deleteEducation(  resumeId,id, email);

        return ResponseEntity.ok(
                "Education deleted successfully"
        );
    }
}
