package com.resumebackend.resume.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String issuingOrganization;

    private String issueDate;

    private String credentialUrl;

    @ManyToOne
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;
}