package com.resumebackend.resume.controller;

import com.resumebackend.resume.dto.ResumeReq;
import com.resumebackend.resume.dto.ResumeRespo;
import com.resumebackend.resume.dto.TemplateUpdateRequest;
//import com.resumebackend.resume.service.PdfService;
import com.resumebackend.resume.service.ResumeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class ResumeController {
    private final ResumeService resumeService;
  //  private final PdfService pdfService;

    @PostMapping
    public ResponseEntity<ResumeRespo> createResume(@Valid @RequestBody ResumeReq req, Authentication authentication) {
        String email = authentication.getName();
        ResumeRespo respo = resumeService.createResume(req, email);

        return ResponseEntity.ok(respo);

    }

    @GetMapping
    public ResponseEntity<List<ResumeRespo>> getMyResumes(Authentication authentication) {
        List<ResumeRespo>respo = resumeService.getMyResumes(authentication.getName());
        return ResponseEntity.ok(respo);
    }

    @PutMapping("/{resumeId}")
    public ResponseEntity<ResumeRespo> updateResume( @PathVariable Long resumeId,@Valid @RequestBody ResumeReq req, Authentication authentication) {
        ResumeRespo updatedRespo = resumeService.updateResume( resumeId,req, authentication.getName());
        return ResponseEntity.ok(updatedRespo);
    }

    @DeleteMapping("/{resumeId}")
    public ResponseEntity<String> deleteResume(  @PathVariable Long resumeId,Authentication authentication) {
        resumeService.deleteResume( resumeId,authentication.getName());
        return ResponseEntity.ok("Resume deleted successfully");
    }

    @PutMapping("/{resumeId}/template")
    public ResponseEntity<ResumeRespo> updateTemplate(@PathVariable Long resumeId,
            @RequestBody TemplateUpdateRequest req,
            Authentication authentication) {

        ResumeRespo response = resumeService.updateTemplate(resumeId,
                authentication.getName(),
                req.getTemplate()
        );

        return ResponseEntity.ok(response);
    }
    @GetMapping("/{resumeId}")
    public ResponseEntity<ResumeRespo> getResumeById(
            @PathVariable Long resumeId,
            Authentication authentication) {

        String email = authentication.getName();

        ResumeRespo response =
                resumeService.getResumeById(resumeId, email);

        return ResponseEntity.ok(response);
    }
//    @GetMapping("/pdf")
//    public ResponseEntity<byte[]>generatePdf(Authentication authentication){
//        byte[]pdf=pdfService.generateResumePdf(authentication.getName());
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment;filename=resume.pdf")
//                .contentType(MediaType.APPLICATION_PDF)
//                .body(pdf);
//    }

}

