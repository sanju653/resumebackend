import type { ResumeResponse } from "../services/resumeService";
import type { EducationResponse } from "../services/educationService";
import type { ExperienceResponse } from "../services/experienceService";
import type { ProjectResponse } from "../services/projectService";
import type { SkillResponse } from "../services/skillService";
import type { SocialLinkResponse } from "../services/socialLinkService";

interface MinimalTemplateProps {
    resume: ResumeResponse;
    education: EducationResponse[];
    experience: ExperienceResponse[];
    projects: ProjectResponse[];
    skills: SkillResponse[];
    socialLinks: SocialLinkResponse[];
}

function MinimalTemplates({
    resume,
    education,
    experience,
    projects,
    skills,
    socialLinks
}: MinimalTemplateProps) {

    return (

        <div className="minimal-resume">

            {/* Header */}

            <header className="minimal-header">

                <h1>{resume.fullName}</h1>

                <p>Java Full Stack Developer</p>

                <div className="minimal-contact">

                    <span>{resume.email}</span>

                    <span>{resume.phone}</span>

                    <span>{resume.address}</span>

                </div>

            </header>


            {/* Profile */}

            <section className="minimal-section">

                <h2>PROFILE</h2>

                <p>
                    {resume.summary}
                </p>

            </section>


            {/* Experience */}

            <section className="minimal-section">

                <h2>EXPERIENCE</h2>

                {experience.map((exp) => (

                    <div
                        className="minimal-item"
                        key={exp.id}
                    >

                        <div className="minimal-item-header">

                            <div>

                                <h3>{exp.jobTitle}</h3>

                                <p className="minimal-company">
                                    {exp.company}
                                </p>

                            </div>

                            <span>
                                {exp.startDate} - {exp.endDate}
                            </span>

                        </div>

                        <p className="minimal-location">
                            {exp.location}
                        </p>

                        <p>
                            {exp.description}
                        </p>

                    </div>

                ))}

            </section>


            {/* Education */}

            <section className="minimal-section">

                <h2>EDUCATION</h2>

                {education.map((edu) => (

                    <div
                        className="minimal-item"
                        key={edu.id}
                    >

                        <div className="minimal-item-header">

                            <div>

                                <h3>{edu.degree}</h3>

                                <p className="minimal-company">
                                    {edu.institution}
                                </p>

                            </div>

                            <span>
                                {edu.startYear} - {edu.endYear}
                            </span>

                        </div>

                        <p className="minimal-location">
                            {edu.location}
                        </p>

                    </div>

                ))}

            </section>


            {/* Projects */}

            <section className="minimal-section">

                <h2>PROJECTS</h2>

                {projects.map((project) => (

                    <div
                        className="minimal-item"
                        key={project.id}
                    >

                        <h3>{project.title}</h3>

                        <p>
                            {project.description}
                        </p>

                        <p className="minimal-technologies">
                            <strong>Technologies:</strong>{" "}
                            {project.technologies}
                        </p>

                        <div className="minimal-project-links">

                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </a>
                            )}

                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Live Demo
                                </a>
                            )}

                        </div>

                    </div>

                ))}

            </section>


            {/* Skills */}

            <section className="minimal-section">

                <h2>SKILLS</h2>

                <div className="minimal-skills">

                    {skills.map((skill) => (

                        <span key={skill.id}>
                            {skill.name}
                        </span>

                    ))}

                </div>

            </section>


            {/* Social Links */}

            <section className="minimal-section">

                <h2>LINKS</h2>

                <div className="minimal-links">

                    {socialLinks.map((social) => (

                        <a
                            key={social.id}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {social.platform}
                        </a>

                    ))}

                </div>

            </section>

        </div>
    );
}

export default MinimalTemplates;