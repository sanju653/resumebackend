package com.resumebackend.resume.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EducationRespo {
    private Long id;
    private String degree;
    private String institution;
    private String location;
    private String startYear;
    private String endYear;
}
