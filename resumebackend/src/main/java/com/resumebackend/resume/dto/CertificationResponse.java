package com.resumebackend.resume.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CertificationResponse {

    private Long id;

    private String name;

    private String issuingOrganization;

    private String issueDate;

    private String credentialUrl;
}