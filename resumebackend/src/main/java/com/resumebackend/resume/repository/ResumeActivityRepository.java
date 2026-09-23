package com.resumebackend.resume.repository;

import com.resumebackend.resume.entity.ResumeActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ResumeActivityRepository
        extends JpaRepository<ResumeActivity, Long> {

    List<ResumeActivity> findByResumeIdOrderByCreatedAtDesc(Long resumeId);
}
