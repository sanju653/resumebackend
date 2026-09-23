package com.resumebackend.resume.service;

import com.resumebackend.resume.dto.EducationReq;
import com.resumebackend.resume.dto.EducationRespo;
import com.resumebackend.resume.entity.Education;
import com.resumebackend.resume.entity.Resume;
import com.resumebackend.resume.entity.User;
import com.resumebackend.resume.exception.BadRequestException;
import com.resumebackend.resume.exception.ResourceNotFoundException;
import com.resumebackend.resume.repository.EducationRepository;
import com.resumebackend.resume.repository.ResumeRepository;
import com.resumebackend.resume.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationService {
    private final EducationRepository educationRepository;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    // Find the logged-in user's resume
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

//create education
    public EducationRespo createEducation(Long resumeId,String email, EducationReq req) {
        ///creating entity obj using @Builder
        Education education=Education.builder()
                .degree(req.getDegree())
                .institution(req.getInstitution())
                .location(req.getLocation())
                .startYear(req.getStartYear())
                .endYear(req.getEndYear())
                .resume(getMyResume(resumeId, email))
                .build();
        Education savedEducation=educationRepository.save(education);
        return mapToResponse(savedEducation);
    }
    // Convert Entity → Response DTO,can use @builder( use @BUilder in dto)
    private EducationRespo mapToResponse(
            Education education) {
//creating dto obj using constructor
        return new EducationRespo(
                education.getId(),
                education.getDegree(),
                education.getInstitution(),
                education.getLocation(),
                education.getStartYear(),
                education.getEndYear()
        );
    }
    //get all education records
    public List<EducationRespo> getMyEducation( Long resumeId,String email){
        return educationRepository.findByResumeId(getMyResume(resumeId,email).getId())
                .stream()
                .map(this::mapToResponse)//ake every Education object and call my mapToResponse() method on it.
                .toList();

    }
    //update education
    public EducationRespo updateEducation( Long resumeId,Long id,String email,EducationReq req){
        Resume resume=getMyResume(resumeId,email);
        Education education = educationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Education not found"));
        if(!education.getResume().getId().equals(resume.getId())){
            throw new BadRequestException(
                    "You cannot update this education");
        }
        education.setDegree(req.getDegree());
        education.setInstitution(req.getInstitution());
        education.setLocation(req.getLocation());
        education.setStartYear(req.getStartYear());
        education.setEndYear(req.getEndYear());

        Education updatedEducation =
                educationRepository.save(education);

        return mapToResponse(updatedEducation);

    }
    // DELETE education
    public void deleteEducation(Long resumeId,
            Long id,
            String email) {

        Resume resume = getMyResume(resumeId,email);

        Education education = educationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Education not found"));

        // Make sure this education belongs to logged-in user
        if (!education.getResume().getId().equals(resume.getId())) {
            throw new BadRequestException(
                    "You cannot delete this education");
        }

        educationRepository.delete(education);
    }
}
