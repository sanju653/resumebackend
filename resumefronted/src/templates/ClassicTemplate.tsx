import type { ResumeResponse } from "../services/resumeService";
import type { EducationResponse } from "../services/educationService";
import type { ExperienceResponse } from "../services/experienceService";
import type { ProjectResponse } from "../services/projectService";
import type { SkillResponse } from "../services/skillService";
import type { SocialLinkResponse } from "../services/socialLinkService";

interface ClassicTemplateProps {
    resume: ResumeResponse;
    education: EducationResponse[];
    experience: ExperienceResponse[];
    projects: ProjectResponse[];
    skills: SkillResponse[];
    socialLinks: SocialLinkResponse[];
}

function ClassicTemplate({
    resume,
    education,
    experience,
    projects,
    skills,
    socialLinks
}: ClassicTemplateProps) {

    return (

        <div className="classic-resume">

            {/* Header */}

            <header className="classic-header">

                <h1>{resume.fullName}</h1>

                <p className="classic-title">
                    Java Full Stack Developer
                </p>

                <div className="classic-contact">

                    <span>{resume.email}</span>

                    <span>{resume.phone}</span>

                    <span>{resume.address}</span>

                </div>

            </header>


            {/* Profile */}

            <section className="classic-section">

                <h2>PROFILE</h2>

                <p>
                    {resume.summary}
                </p>

            </section>


            {/* Experience */}

            <section className="classic-section">

                <h2>EXPERIENCE</h2>

                {experience.map((exp) => (

                    <div
                        className="classic-item"
                        key={exp.id}
                    >

                        <div className="classic-item-header">

                            <div>

                                <h3>{exp.jobTitle}</h3>

                                <p className="classic-company">
                                    {exp.company}
                                </p>

                            </div>

                            <span>
                                {exp.startDate} - {exp.endDate}
                            </span>

                        </div>

                        <p className="classic-location">
                            {exp.location}
                        </p>

                        <p>
                            {exp.description}
                        </p>

                    </div>

                ))}

            </section>


            {/* Education */}

            <section className="classic-section">

                <h2>EDUCATION</h2>

                {education.map((edu) => (

                    <div
                        className="classic-item"
                        key={edu.id}
                    >

                        <div className="classic-item-header">

                            <div>

                                <h3>{edu.degree}</h3>

                                <p className="classic-company">
                                    {edu.institution}
                                </p>

                            </div>

                            <span>
                                {edu.startYear} - {edu.endYear}
                            </span>

                        </div>

                        <p className="classic-location">
                            {edu.location}
                        </p>

                    </div>

                ))}

            </section>


            {/* Projects */}

            <section className="classic-section">

                <h2>PROJECTS</h2>

                {projects.map((project) => (

                    <div
                        className="classic-item"
                        key={project.id}
                    >

                        <h3>{project.title}</h3>

                        <p>
                            {project.description}
                        </p>

                        <p>
                            <strong>Technologies:</strong>{" "}
                            {project.technologies}
                        </p>

                        {project.githubUrl && (
                            <p>
                                GitHub: {project.githubUrl}
                            </p>
                        )}

                        {project.liveUrl && (
                            <p>
                                Live: {project.liveUrl}
                            </p>
                        )}

                    </div>

                ))}

            </section>


            {/* Skills */}

            <section className="classic-section">

                <h2>SKILLS</h2>

                <div className="classic-skills">

                    {skills.map((skill) => (

                        <span key={skill.id}>
                            {skill.name}
                        </span>

                    ))}

                </div>

            </section>


            {/* Social Links */}

            <section className="classic-section">

                <h2>SOCIAL LINKS</h2>

                {socialLinks.map((social) => (

                    <p key={social.id}>

                        <strong>
                            {social.platform}:
                        </strong>{" "}

                        <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {social.url}
                        </a>

                    </p>

                ))}

            </section>

        </div>
    );
}

export default ClassicTemplate;