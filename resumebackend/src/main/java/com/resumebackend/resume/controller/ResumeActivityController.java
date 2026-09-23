package com.resumebackend.resume.controller;

import com.resumebackend.resume.dto.ResumeActivityResponse;
import com.resumebackend.resume.entity.ResumeActivity;
import com.resumebackend.resume.service.ResumeActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeActivityController {

    private final ResumeActivityService activityService;


    @GetMapping("/{resumeId}/activities")
    public ResponseEntity<List<ResumeActivityResponse>> getActivities(
            @PathVariable Long resumeId) {

        List<ResumeActivity> activities =
                activityService.getActivities(resumeId);

        List<ResumeActivityResponse> response =
                activities.stream()
                        .map(activity ->
                                new ResumeActivityResponse(
                                        activity.getId(),
                                        activity.getActivityType(),
                                        activity.getCreatedAt()
                                )
                        )
                        .toList();

        return ResponseEntity.ok(response);
    }
}