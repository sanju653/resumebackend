//package com.resumebackend.resume.service;
//
//import com.lowagie.text.Font;
//import com.lowagie.text.FontFactory;
//import com.lowagie.text.Paragraph;
//import com.lowagie.text.pdf.PdfWriter;
//import com.resumebackend.resume.entity.*;
//import com.resumebackend.resume.exception.ResourceNotFoundException;
//import com.resumebackend.resume.repository.ResumeRepository;
//import com.resumebackend.resume.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//
//import org.springframework.stereotype.Service;
//
//
//import com.lowagie.text.Document;
//import java.io.ByteArrayOutputStream;
//
//
//@Service
//@RequiredArgsConstructor
//public class PdfService {
//    private final ResumeRepository resumeRepository;
//    private final UserRepository userRepository;
//
//    public byte[] generateResumePdf(String email){
//        User user=userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not found"));
//        Resume resume=resumeRepository.findByUserId(user.getId()).orElseThrow(()->new ResourceNotFoundException("Resume not found"));
//
//        ByteArrayOutputStream outputStream=new ByteArrayOutputStream();
//        Document document=new Document();
//        PdfWriter.getInstance(document,outputStream);
//
//        document.open();
//
//        ResumeTemplate template = resume.getTemplate();
//
//        if (template == null) {
//            template = ResumeTemplate.MODERN;
//        }
//        switch (template) {
//
//            case MODERN:
//                generateModernTemplate(document, resume);
//                break;
//
//            case CLASSIC:
//                generateClassicTemplate(document, resume);
//                break;
//
//            case MINIMAL:
//                generateMinimalTemplate(document, resume);
//                break;
//        }
//
//        document.close();
//
//        return outputStream.toByteArray();
//    }
//    private void addSectionTitle(
//            Document document,
//            String title,
//            Font font) {
//
//        document.add(
//                new Paragraph("\n" + title, font)
//        );
//    }
//    private void generateModernTemplate(
//            Document document,
//            Resume resume) {
//
//        Font nameFont = FontFactory.getFont(
//                FontFactory.HELVETICA_BOLD,
//                22,
//                Font.NORMAL
//        );
//
//        Font contactFont = FontFactory.getFont(
//                FontFactory.HELVETICA,
//                10,
//                Font.NORMAL
//        );
//
//        Font sectionFont = FontFactory.getFont(
//                FontFactory.HELVETICA_BOLD,
//                13,
//                Font.NORMAL
//        );
//
//        Font titleFont = FontFactory.getFont(
//                FontFactory.HELVETICA_BOLD,
//                11,
//                Font.NORMAL
//        );
//
//        document.add(
//                new Paragraph(resume.getFullName(),nameFont)
//        );
//
//        document.add(
//                new Paragraph( resume.getEmail()+" | "+resume.getPhone(),contactFont)
//        );
//
//
//
//        document.add(
//                new Paragraph( resume.getAddress(),contactFont)
//        );
//
//        addSectionTitle(document, "SUMMARY", sectionFont);
//        document.add(
//                new Paragraph(
//                        resume.getSummary() != null
//                                ? resume.getSummary()
//                                : ""
//                )
//        );
//
//        addSectionTitle(document, "EDUCATION", sectionFont);
//
//        for (Education education : resume.getEducations()) {
//
//            document.add(
//                    new Paragraph(
//                            education.getDegree()
//                                    + " - "
//                                    + education.getInstitution()
//                    )
//            );
//
//            document.add(
//                    new Paragraph(
//                            "Location: "
//                                    + education.getLocation()
//                    )
//            );
//
//            document.add(
//                    new Paragraph(
//                            "Duration: "
//                                    + education.getStartYear()
//                                    + " - "
//                                    + education.getEndYear()
//                    )
//            );
//        }
//
//        addSectionTitle(document, "SKILLS", sectionFont);
//
//        for (Skill skill : resume.getSkills()) {
//
//            document.add(
//                    new Paragraph(
//                            skill.getName()
//                                    + " - "
//                                    + skill.getCategory()
//                    )
//            );
//        }
//
//        addSectionTitle(document, "EXPERIENCE", sectionFont);
//
//        for (Experience experience :
//                resume.getExperiences()) {
//
//            document.add(
//                    new Paragraph(
//                            experience.getJobTitle()
//                                    + " - "
//                                    + experience.getCompany()
//                    )
//            );
//
//            document.add(
//                    new Paragraph(
//                            "Location: "
//                                    + experience.getLocation()
//                    )
//            );
//
//            document.add(
//                    new Paragraph(
//                            "Duration: "
//                                    + experience.getStartDate()
//                                    + " - "
//                                    + experience.getEndDate()
//                    )
//            );
//
//            document.add(
//                    new Paragraph(
//                            experience.getDescription()
//                    )
//            );
//        }
//
//        addSectionTitle(document, "PROJECT", sectionFont);
//
//        for (Project project : resume.getProjects()) {
//
//            document.add(
//                    new Paragraph(project.getTitle())
//            );
//
//            document.add(
//                    new Paragraph(
//                            project.getDescription()
//                    )
//            );
//
//            document.add(
//                    new Paragraph(
//                            "Technologies: "
//                                    + project.getTechnologies()
//                    )
//            );
//
//            if (project.getGithubUrl() != null) {
//
//                document.add(
//                        new Paragraph(
//                                "GitHub: "
//                                        + project.getGithubUrl()
//                        )
//                );
//            }
//
//            if (project.getLiveUrl() != null) {
//
//                document.add(
//                        new Paragraph(
//                                "Live: "
//                                        + project.getLiveUrl()
//                        )
//                );
//            }
//        }
//
//        addSectionTitle(document, "CERTIFICATIONS", sectionFont);
//
//        for (Certification certification :
//                resume.getCertifications()) {
//
//            document.add(
//                    new Paragraph(
//                            certification.getName()
//                                    + " - "
//                                    + certification
//                                    .getIssuingOrganization()
//                    )
//            );
//
//            document.add(
//                    new Paragraph(
//                            "Issue Date: "
//                                    + certification.getIssueDate()
//                    )
//            );
//
//            if (certification.getCredentialUrl() != null) {
//
//                document.add(
//                        new Paragraph(
//                                "Credential: "
//                                        + certification
//                                        .getCredentialUrl()
//                        )
//                );
//            }
//        }
//
//        addSectionTitle(document, "SOCIAL LINKS", sectionFont);
//        for (SocialLink socialLink :
//                resume.getSocialLinks()) {
//
//            document.add(
//                    new Paragraph(
//                            socialLink.getPlatform()
//                                    + ": "
//                                    + socialLink.getUrl()
//                    )
//            );
//        }
//    }
//    private void generateClassicTemplate(
//            Document document,
//            Resume resume) {
//
//    }
//    private void generateMinimalTemplate(
//            Document document,
//            Resume resume) {
//
//    }
//}
