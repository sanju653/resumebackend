package com.resumebackend.resume.repository;

import com.resumebackend.resume.entity.SocialLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SocialLinkRepository extends JpaRepository<SocialLink, Long> {

    List<SocialLink> findByResumeId(Long resumeId);
}