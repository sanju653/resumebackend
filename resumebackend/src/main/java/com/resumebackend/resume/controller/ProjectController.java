package com.resumebackend.resume.controller;

import com.resumebackend.resume.dto.ProjectReq;
import com.resumebackend.resume.dto.ProjectResponse;
import com.resumebackend.resume.service.ProjectService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/resume/{resumeId}/projects")
@SecurityRequirement(name="bearerAuth")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponse>createProject( @PathVariable  Long resumeId,@Valid @RequestBody ProjectReq req, Authentication authentication){
        return ResponseEntity.ok(projectService.createProject(resumeId,authentication.getName(), req));
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>>getMyAllProjects(@PathVariable  Long resumeId,Authentication authentication){

        return ResponseEntity.ok(projectService.getAllProjects(resumeId,authentication.getName()));

    }
    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponse>updateProject(@PathVariable  Long resumeId,@PathVariable Long id,@Valid @RequestBody ProjectReq req,Authentication authentication){
        return ResponseEntity.ok(projectService.updateProject(resumeId,id,authentication.getName(),req));

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable  Long resumeId,
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        projectService.deleteProject(resumeId,id, email);

        return ResponseEntity.ok(
                "Project deleted successfully"
        );
    }
}
