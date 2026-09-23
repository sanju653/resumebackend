package com.resumebackend.resume.service;

import com.resumebackend.resume.dto.ProjectReq;
import com.resumebackend.resume.dto.ProjectResponse;
import com.resumebackend.resume.entity.Project;
import com.resumebackend.resume.entity.Resume;
import com.resumebackend.resume.entity.User;
import com.resumebackend.resume.exception.BadRequestException;
import com.resumebackend.resume.exception.ResourceNotFoundException;
import com.resumebackend.resume.repository.ProjectRepository;
import com.resumebackend.resume.repository.ResumeRepository;
import com.resumebackend.resume.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;

    //find resume
    public Resume getMyResume( Long resumeId,String email){
        User user=userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not Found"));
        Resume resume=resumeRepository.findById(resumeId).orElseThrow(()->new ResourceNotFoundException("Resume not found"));

        if(!resume.getUser().getId().equals(user.getId())){
            throw new BadRequestException("You do not have access to this resume");
        }
        return resume;

    }
    //create project
    public ProjectResponse createProject( Long resumeId,String email, ProjectReq req){
        Project project=  Project.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .technologies(req.getTechnologies())
                .githubUrl(req.getGithubUrl())
                .liveUrl(req.getLiveUrl())
                .resume(getMyResume(resumeId,email))
                .build();

        Project savedProject=projectRepository.save(project);
          return mapToResponse(savedProject);

    }
    private ProjectResponse mapToResponse(Project project){
        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getTechnologies(),
                project.getGithubUrl(),
                project.getLiveUrl()
        );

    }
    public List<ProjectResponse>getAllProjects( Long resumeId,String email){
       return projectRepository.findByResumeId(getMyResume(resumeId,email).getId()).stream()
               .map(this::mapToResponse).toList();

    }
    public ProjectResponse updateProject(  Long resumeId,Long id,String email,ProjectReq req){

        Resume resume=getMyResume(resumeId,email);
        Project project=projectRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Project not found"));

        if(!project.getResume().getId().equals(resume.getId())){
            throw new BadRequestException(
                    "You cannot update this project");
        }
        project.setTitle(req.getTitle());
        project.setDescription(req.getDescription());
        project.setTechnologies(req.getTechnologies());
        project.setGithubUrl(req.getGithubUrl());
        project.setLiveUrl(req.getLiveUrl());
        Project updatedProject =
                projectRepository.save(project);

        return mapToResponse(updatedProject);

    }
    public void deleteProject( Long resumeId,
            Long id,
            String email) {

        Resume resume = getMyResume( resumeId,email);

        Project project = projectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Project not found"));

        // Check ownership
        if (!project.getResume().getId()
                .equals(resume.getId())) {

            throw new BadRequestException(
                    "You cannot delete this project");
        }

        projectRepository.delete(project);
    }

}
