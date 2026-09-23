package com.resumebackend.resume.service;


import com.resumebackend.resume.entity.Resume;
import com.resumebackend.resume.entity.ResumeActivity;
import com.resumebackend.resume.repository.ResumeActivityRepository;
import com.resumebackend.resume.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeActivityService {

    private final ResumeActivityRepository activityRepository;
    private final ResumeRepository resumeRepository;



    public void logActivity(Long resumeId, String activityType) {

        Resume resume = resumeRepository
                .findById(resumeId)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        ResumeActivity activity =
                new ResumeActivity();

        activity.setResume(resume);
        activity.setActivityType(activityType);

        activityRepository.save(activity);
    }

    public List<ResumeActivity> getActivities(Long resumeId) {

        return activityRepository
                .findByResumeIdOrderByCreatedAtDesc(resumeId);
    }
}
