package com.resumebackend.resume.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Resume {
 @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String phone;

    private String email;

    private String address;

    @Column(length = 2000)
    private String summary;
    private String jobRole;




   // Resume belongs to one User
   @ManyToOne
   @JoinColumn(name = "user_id", nullable = false)
   private User user;


   // Education
   @Builder.Default
   @OneToMany(
           mappedBy = "resume",
           cascade = CascadeType.ALL,
           orphanRemoval = true//If a child is removed from the parent's collection, delete that child from the database.
   )
   private List<Education> educations=new ArrayList<>();


   // Experience
   @Builder.Default
   @OneToMany(
           mappedBy = "resume",
           cascade = CascadeType.ALL,
           orphanRemoval = true
   )
   private List<Experience> experiences = new ArrayList<>();;


   // Projects
   @Builder.Default
   @OneToMany(
           mappedBy = "resume",
           cascade = CascadeType.ALL,
           orphanRemoval = true
   )
   private List<Project> projects = new ArrayList<>();;


   // Skills
   @Builder.Default
   @OneToMany(
           mappedBy = "resume",
           cascade = CascadeType.ALL,
           orphanRemoval = true
   )
   private List<Skill> skills = new ArrayList<>();;


   // Certifications
   @Builder.Default
   @OneToMany(
           mappedBy = "resume",
           cascade = CascadeType.ALL,
           orphanRemoval = true
   )
   private List<Certification> certifications = new ArrayList<>();;


   // Social Links
   @Builder.Default
   @OneToMany(
           mappedBy = "resume",
           cascade = CascadeType.ALL,
           orphanRemoval = true
   )
   private List<SocialLink> socialLinks = new ArrayList<>();;
@Enumerated(EnumType.STRING)
   private ResumeTemplate template;
}
