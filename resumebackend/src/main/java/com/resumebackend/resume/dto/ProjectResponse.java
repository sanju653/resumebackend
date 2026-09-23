package com.resumebackend.resume.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponse {

    private Long id;
    private String title;
    private String description;
    private String technologies;
    private String githubUrl;
    private String liveUrl;
}