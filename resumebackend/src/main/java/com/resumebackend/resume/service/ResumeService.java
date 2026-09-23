package com.resumebackend.resume.service;

import com.resumebackend.resume.dto.ResumeReq;
import com.resumebackend.resume.dto.ResumeRespo;
import com.resumebackend.resume.entity.Resume;
import com.resumebackend.resume.entity.ResumeTemplate;
import com.resumebackend.resume.entity.User;
import com.resumebackend.resume.exception.BadRequestException;
import com.resumebackend.resume.exception.ResourceNotFoundException;
import com.resumebackend.resume.repository.ResumeRepository;
import com.resumebackend.resume.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeService {
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final ResumeActivityService resumeActivityService;

    public ResumeRespo createResume(ResumeReq req,String email){
        User user=userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("User not Found"));

        Resume resume = Resume.builder()
                .fullName(req.getFullName())
                .phone(req.getPhone())
                .email(req.getEmail())
                .address(req.getAddress())
                .summary(req.getSummary())
                .jobRole(req.getJobRole())
           .template(ResumeTemplate.MODERN)
                .user(user)
                .build();
        Resume savedResume=resumeRepository.save(resume);
        resumeActivityService.logActivity(
                savedResume.getId(),
                "RESUME_CREATED"
        );
        return convertToREsponse(savedResume);
    }
    private ResumeRespo convertToREsponse(Resume resume){
        return new ResumeRespo(
                resume.getId(),
                resume.getFullName(),
                resume.getPhone(),
                resume.getEmail(),
                resume.getAddress(),
                resume.getSummary(),
                resume.getJobRole(),
                resume.getTemplate()


        );
    }

    public List<ResumeRespo> getMyResumes(String email){
        List<Resume> resumes=resumeRepository.findAllByUserId(userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("User not found")).getId());
        return resumes.stream()
                .map(this::convertToREsponse)
                .toList();
    }
    public ResumeRespo updateResume(Long resumeId, ResumeReq req,String email){
        User user=userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("user not found"));
        Resume resume=resumeRepository.findById(resumeId).orElseThrow(()->new ResourceNotFoundException("Resume not found"));
        if (!resume.getUser().getId().equals(user.getId())) {
            throw new BadRequestException(
                    "You cannot update this resume");
        }
        resume.setFullName(req.getFullName());
        resume.setPhone(req.getPhone());
        resume.setEmail(req.getEmail());
        resume.setAddress(req.getAddress());
        resume.setSummary(req.getSummary());
        resume.setJobRole(req.getJobRole());
//

        Resume updatedResume = resumeRepository.save(resume);resumeActivityService.logActivity(
                updatedResume.getId(),
                "RESUME_UPDATED"
        );

        return convertToREsponse(updatedResume);

    }
    public void deleteResume(Long resumeId,String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new  ResourceNotFoundException("Resume not found"));

        if (!resume.getUser().getId().equals(user.getId())) {
            throw new BadRequestException(
                    "You cannot delete this resume");
        }
        resumeRepository.delete(resume);
    }
    public ResumeRespo updateTemplate(
            Long resumeId,
            String email,
            ResumeTemplate template) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found"));
        if (!resume.getUser().getId().equals(user.getId())) {
            throw new BadRequestException(
                    "You cannot update this resume");
        }
        ResumeTemplate oldTemplate = resume.getTemplate();
        resume.setTemplate(template);

        Resume updatedResume = resumeRepository.save(resume);
        if (oldTemplate != template) {
            resumeActivityService.logActivity(
                    updatedResume.getId(),
                    "TEMPLATE_CHANGED"
            );
        }

        return convertToREsponse(updatedResume);
    }
    public ResumeRespo getResumeById(
            Long resumeId,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found"));

        if (!resume.getUser().getId().equals(user.getId())) {
            throw new BadRequestException(
                    "You cannot access this resume");
        }

        return convertToREsponse(resume);
    }

}
