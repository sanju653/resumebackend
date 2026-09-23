package com.resumebackend.resume.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillResponse {

    private Long id;
    private String name;
    private String category;
}