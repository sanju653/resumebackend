package com.resumebackend.resume.service;

import com.resumebackend.resume.dto.ExperienceReq;
import com.resumebackend.resume.dto.ExperienceResponse;
import com.resumebackend.resume.entity.Experience;
import com.resumebackend.resume.entity.Resume;
import com.resumebackend.resume.entity.User;
import com.resumebackend.resume.exception.BadRequestException;
import com.resumebackend.resume.exception.ResourceNotFoundException;
import com.resumebackend.resume.repository.ExperienceRepository;
import com.resumebackend.resume.repository.ResumeRepository;
import com.resumebackend.resume.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository experienceRepository;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;


    // Find logged-in user's Resume
    private Resume getMyResume(Long resumeId,String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Resume resume =  resumeRepository.findById(resumeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found"));
        if (!resume.getUser().getId().equals(user.getId())) {
            throw new BadRequestException(
                    "You do not have access to this resume"
            );
        }
        return resume;
    }


    // CREATE Experience
    public ExperienceResponse createExperience(Long resumeId,
            String email,
            ExperienceReq req) {

        Resume resume = getMyResume(resumeId,email);

        Experience experience = Experience.builder()
                .jobTitle(req.getJobTitle())
                .company(req.getCompany())
                .location(req.getLocation())
                .startDate(req.getStartDate())
                .endDate(req.getEndDate())
                .description(req.getDescription())
                .resume(resume)
                .build();

        Experience savedExperience =
                experienceRepository.save(experience);

        return mapToResponse(savedExperience);
    }


    // GET all Experiences
    public List<ExperienceResponse> getMyExperiences(Long resumeId,
            String email) {

        Resume resume = getMyResume(resumeId,email);

        return experienceRepository
                .findByResumeId(resume.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // UPDATE Experience
    public ExperienceResponse updateExperience(Long resumeId,
            Long id,
            String email,
            ExperienceReq req) {

        Resume resume = getMyResume(resumeId,email);

        Experience experience =
                experienceRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Experience not found"));

        // Check ownership
        if (!experience.getResume().getId()
                .equals(resume.getId())) {

            throw new BadRequestException(
                    "You cannot update this experience");
        }

        experience.setJobTitle(req.getJobTitle());
        experience.setCompany(req.getCompany());
        experience.setLocation(req.getLocation());
        experience.setStartDate(req.getStartDate());
        experience.setEndDate(req.getEndDate());
        experience.setDescription(req.getDescription());

        Experience updatedExperience =
                experienceRepository.save(experience);

        return mapToResponse(updatedExperience);
    }


    // DELETE Experience
    public void deleteExperience(Long resumeId,
            Long id,
            String email) {

        Resume resume = getMyResume( resumeId,email);

        Experience experience =
                experienceRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Experience not found"));

        // Check ownership
        if (!experience.getResume().getId()
                .equals(resume.getId())) {

            throw new BadRequestException(
                    "You cannot delete this experience");
        }

        experienceRepository.delete(experience);
    }


    // Entity → Response DTO
    private ExperienceResponse mapToResponse(
            Experience experience) {

        return new ExperienceResponse(
                experience.getId(),
                experience.getJobTitle(),
                experience.getCompany(),
                experience.getLocation(),
                experience.getStartDate(),
                experience.getEndDate(),
                experience.getDescription()
        );
    }
}