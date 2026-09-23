package com.resumebackend.resume.service;

import com.resumebackend.resume.dto.CertificationReq;
import com.resumebackend.resume.dto.CertificationResponse;
import com.resumebackend.resume.entity.Certification;
import com.resumebackend.resume.entity.Resume;
import com.resumebackend.resume.entity.User;
import com.resumebackend.resume.exception.BadRequestException;
import com.resumebackend.resume.exception.ResourceNotFoundException;
import com.resumebackend.resume.repository.CertificationRepository;
import com.resumebackend.resume.repository.ResumeRepository;
import com.resumebackend.resume.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CertificationService {

    private final CertificationRepository certificationRepository;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;


    // Find logged-in user's Resume
    private Resume getMyResume(Long resumeId,String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

     Resume resume=resumeRepository.findById(resumeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found"));

     if(!resume.getUser().getId().equals(user.getId())){
         throw new BadRequestException("You do not have access to this resume");
     }
     return resume;
    }


    // CREATE
    public CertificationResponse createCertification(Long resumeId,
            String email,
            CertificationReq req) {

        Resume resume = getMyResume(resumeId,email);

        Certification certification = Certification.builder()
                .name(req.getName())
                .issuingOrganization(req.getIssuingOrganization())
                .issueDate(req.getIssueDate())
                .credentialUrl(req.getCredentialUrl())
                .resume(resume)
                .build();

        Certification savedCertification =
                certificationRepository.save(certification);

        return mapToResponse(savedCertification);
    }


    // GET MY CERTIFICATIONS
    public List<CertificationResponse> getMyCertifications(Long resumeId,
            String email) {

        Resume resume = getMyResume(resumeId,email);

        return certificationRepository
                .findByResumeId(resume.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // UPDATE
    public CertificationResponse updateCertification(Long resumeId,
            Long id,
            String email,
            CertificationReq req) {

        Resume resume = getMyResume(resumeId,email);

        Certification certification =
                certificationRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Certification not found"));

        // Check ownership
        if (!certification.getResume().getId()
                .equals(resume.getId())) {

            throw new BadRequestException(
                    "You cannot update this certification");
        }

        certification.setName(req.getName());
        certification.setIssuingOrganization(
                req.getIssuingOrganization()
        );
        certification.setIssueDate(req.getIssueDate());
        certification.setCredentialUrl(
                req.getCredentialUrl()
        );

        Certification updatedCertification =
                certificationRepository.save(certification);

        return mapToResponse(updatedCertification);
    }


    // DELETE
    public void deleteCertification(Long resumeId,
            Long id,
            String email) {

        Resume resume = getMyResume(resumeId,email);

        Certification certification =
                certificationRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Certification not found"));

        // Check ownership
        if (!certification.getResume().getId()
                .equals(resume.getId())) {

            throw new BadRequestException(
                    "You cannot delete this certification");
        }

        certificationRepository.delete(certification);
    }


    // Entity → Response DTO
    private CertificationResponse mapToResponse(
            Certification certification) {

        return new CertificationResponse(
                certification.getId(),
                certification.getName(),
                certification.getIssuingOrganization(),
                certification.getIssueDate(),
                certification.getCredentialUrl()
        );
    }
}