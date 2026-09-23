package com.resumebackend.resume.controller;

import com.resumebackend.resume.dto.SkillReq;
import com.resumebackend.resume.dto.SkillResponse;
import com.resumebackend.resume.service.SkillService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resume/{resumeId}/skills")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class SkillController {

    private final SkillService skillService;


    // CREATE
    @PostMapping
    public ResponseEntity<SkillResponse> createSkill(@PathVariable Long resumeId,
            @Valid @RequestBody SkillReq req,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                skillService.createSkill( resumeId,email, req)
        );
    }


    // GET MY SKILLS
    @GetMapping
    public ResponseEntity<List<SkillResponse>> getMySkills(@PathVariable Long resumeId,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                skillService.getAllSkills( resumeId,email)
        );
    }


    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<SkillResponse> updateSkill(@PathVariable Long resumeId,
            @PathVariable Long id,
            @Valid @RequestBody SkillReq req,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                skillService.updateSkill( resumeId,id, email, req)
        );
    }


    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSkill(@PathVariable Long resumeId,
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        skillService.deleteSkill( resumeId,id, email);

        return ResponseEntity.ok(
                "Skill deleted successfully"
        );
    }
}