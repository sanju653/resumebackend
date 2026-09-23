package com.resumebackend.resume.service;

import com.resumebackend.resume.dto.SocialLinkReq;
import com.resumebackend.resume.dto.SocialLinkResponse;
import com.resumebackend.resume.entity.Resume;
import com.resumebackend.resume.entity.SocialLink;
import com.resumebackend.resume.entity.User;
import com.resumebackend.resume.exception.BadRequestException;
import com.resumebackend.resume.exception.ResourceNotFoundException;
import com.resumebackend.resume.repository.ResumeRepository;
import com.resumebackend.resume.repository.SocialLinkRepository;
import com.resumebackend.resume.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SocialLinkService {

    private final SocialLinkRepository socialLinkRepository;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;


    // Find logged-in user's Resume
    private Resume getMyResume(Long resumeId,String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

 Resume resume= resumeRepository.findById(resumeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found"));
 if(!resume.getUser().getId().equals(user.getId())){
     throw new BadRequestException("You do  not have access to this resume");
 }
 return resume;
    }


    // CREATE
    public SocialLinkResponse createSocialLink(Long resumeId,
            String email,
            SocialLinkReq req) {

        Resume resume = getMyResume(resumeId,email);

        SocialLink socialLink = SocialLink.builder()
                .platform(req.getPlatform())
                .url(req.getUrl())
                .resume(resume)
                .build();

        SocialLink savedSocialLink =
                socialLinkRepository.save(socialLink);

        return mapToResponse(savedSocialLink);
    }


    // GET MY SOCIAL LINKS
    public List<SocialLinkResponse> getMySocialLinks(Long resumeId,
            String email) {

        Resume resume = getMyResume(resumeId,email);

        return socialLinkRepository
                .findByResumeId(resume.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // UPDATE
    public SocialLinkResponse updateSocialLink(Long resumeId,
            Long id,
            String email,
            SocialLinkReq req) {

        Resume resume = getMyResume(resumeId,email);

        SocialLink socialLink =
                socialLinkRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Social link not found"));

        // Check ownership
        if (!socialLink.getResume().getId()
                .equals(resume.getId())) {

            throw new BadRequestException(
                    "You cannot update this social link");
        }

        socialLink.setPlatform(req.getPlatform());
        socialLink.setUrl(req.getUrl());

        SocialLink updatedSocialLink =
                socialLinkRepository.save(socialLink);

        return mapToResponse(updatedSocialLink);
    }


    // DELETE
    public void deleteSocialLink(Long resumeId,
            Long id,
            String email) {

        Resume resume = getMyResume(resumeId,email);

        SocialLink socialLink =
                socialLinkRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Social link not found"));

        // Check ownership
        if (!socialLink.getResume().getId()
                .equals(resume.getId())) {

            throw new BadRequestException(
                    "You cannot delete this social link");
        }

        socialLinkRepository.delete(socialLink);
    }


    // Entity → Response DTO
    private SocialLinkResponse mapToResponse(
            SocialLink socialLink) {

        return new SocialLinkResponse(
                socialLink.getId(),
                socialLink.getPlatform(),
                socialLink.getUrl()
        );
    }
}