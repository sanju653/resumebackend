package com.resumebackend.resume.service;

import com.resumebackend.resume.dto.SkillReq;
import com.resumebackend.resume.dto.SkillResponse;
import com.resumebackend.resume.entity.Resume;
import com.resumebackend.resume.entity.Skill;
import com.resumebackend.resume.entity.User;
import com.resumebackend.resume.exception.BadRequestException;
import com.resumebackend.resume.exception.ResourceNotFoundException;
import com.resumebackend.resume.repository.ResumeRepository;
import com.resumebackend.resume.repository.SkillRepository;
import com.resumebackend.resume.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final SkillRepository skillRepository;
    public Resume findResume(Long resumeId,String email){
        User user=userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not found"));
        Resume resume= resumeRepository.findById(resumeId).orElseThrow(()->new ResourceNotFoundException("Resume not found"));

        if(!resume.getUser().getId().equals(user.getId())){
            throw new BadRequestException("You do not have access to this resume");
        }
        return resume;
    }

    public SkillResponse createSkill(Long resumeId,String email, SkillReq req){

      Skill skill=Skill.builder().
              name(req.getName())
              .category(req.getCategory())
              .resume(findResume(resumeId,email)).build();
      Skill savedSkill=skillRepository.save(skill);
      return mapToResponse(savedSkill);
    }

    public List<SkillResponse> getAllSkills(Long resumeId,String email){
        return skillRepository.findByResumeId(findResume(resumeId,email).getId()).stream().map(this::mapToResponse).toList();
    }

    public SkillResponse mapToResponse(Skill skill){
        return new SkillResponse(skill.getId(), skill.getName(), skill.getCategory());
    }

    public SkillResponse updateSkill(Long resumeId,Long id,String email,SkillReq req){
        Resume resume=findResume(resumeId,email);

        Skill skill=skillRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Skill not found"));

        if(!skill.getResume().getId().equals(resume.getId())){

            throw new BadRequestException(
                    "You cannot update this skill");
        }
        skill.setName(req.getName());
        skill.setCategory(req.getCategory());
        Skill updatedSkill = skillRepository.save(skill);
        return mapToResponse(updatedSkill);
    }
    public void deleteSkill(Long resumeId,
            Long id,
            String email) {

        Resume resume = findResume(resumeId,email);

        Skill skill = skillRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Skill not found"));

        // Ownership check
        if (!skill.getResume().getId()
                .equals(resume.getId())) {

            throw new BadRequestException(
                    "You cannot delete this skill");
        }

        skillRepository.delete(skill);
    }
}
