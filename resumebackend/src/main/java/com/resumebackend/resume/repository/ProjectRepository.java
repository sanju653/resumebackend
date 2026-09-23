package com.resumebackend.resume.repository;

import com.resumebackend.resume.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByResumeId(Long resumeId);
}