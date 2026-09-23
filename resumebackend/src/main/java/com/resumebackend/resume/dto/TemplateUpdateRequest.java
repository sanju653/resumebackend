package com.resumebackend.resume.dto;


import com.resumebackend.resume.entity.ResumeTemplate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TemplateUpdateRequest {

    private ResumeTemplate template;
}