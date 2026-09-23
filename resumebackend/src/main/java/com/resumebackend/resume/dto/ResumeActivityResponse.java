package com.resumebackend.resume.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeActivityResponse {
    private Long id;
    private String activityType;
    private LocalDateTime createdAt;

}
