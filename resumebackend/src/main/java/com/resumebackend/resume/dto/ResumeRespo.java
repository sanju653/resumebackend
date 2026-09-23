package com.resumebackend.resume.dto;

import com.resumebackend.resume.entity.ResumeTemplate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeRespo {
    private Long id;

    private String fullName;

    private String phone;

    private String email;

    private String address;

    private String summary;
    private String jobRole;

    ResumeTemplate template;
}
