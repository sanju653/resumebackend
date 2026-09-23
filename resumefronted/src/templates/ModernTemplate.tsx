import type { ResumeResponse } from "../services/resumeService";
import type { EducationResponse } from "../services/educationService";
import type { ExperienceResponse } from "../services/experienceService";
import type { ProjectResponse } from "../services/projectService";
import type { SkillResponse } from "../services/skillService";
import type { SocialLinkResponse } from "../services/socialLinkService";

interface ModernTemplateProps {
    resume: ResumeResponse;
    education: EducationResponse[];
    experience: ExperienceResponse[];
    projects: ProjectResponse[];
    skills: SkillResponse[];
    socialLinks: SocialLinkResponse[];
       accentColor: string;
}
function ModernTemplate({
    resume,
    education,
    experience,
    projects,
    skills,
    socialLinks, accentColor
}: ModernTemplateProps) {

    return (
        <div className="modern-resume"    style={{
        "--accent-color": accentColor
    } as React.CSSProperties}>

            {/* Header */}
            <div className="resume-header">

             <h1>{resume.fullName}</h1>

                <h2>Java Full Stack Developer</h2>

                <div className="resume-contact">
                   <p>{resume.email}</p>
                   <p>{resume.phone}</p>
                  <p>{resume.address}</p>
                </div>

            </div>


            {/* Profile */}
            <section className="resume-section">

                <h3>PROFILE</h3>

               <p>{resume.summary}</p>

            </section>

 {/* Education */}
            <section className="resume-section">

                <h3>EDUCATION</h3>
                {education.map((edu)=>(
                     <div className="resume-item" key={edu.id}>
                        
                    <div className="item-header">

                        <div>
                              <h3>{edu.degree}</h3>

                   <p>{edu.institution}</p>
                          <span>
                {edu.location} | {edu.startYear} - {edu.endYear}
            </span>

                </div>
                </div>  </div>

                ))}

            </section>

            {/* Experience */}
            <section className="resume-section">

                <h3>EXPERIENCE</h3>

                 {experience.map((exp)=>(
                     <div className="resume-item" key={exp.id}>
                        
                    <div className="item-header">

                        <div>
                              <h3>{exp.jobTitle}</h3>

                    <p>
                {exp.company} | {exp.location}
            </p>
   <span>
                {exp.startDate} - {exp.endDate}
            </span>

            <p>
                {exp.description}
            </p>

                </div>
                </div>  </div>

                ))}

            </section>


           


            {/* Projects */}
          {/* Projects */}
<section className="resume-section">

    <h3>PROJECTS</h3>

    {projects.map((project) => (
        <div className="resume-item" key={project.id}>

            <div className="item-header">

                <div>

                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <span>
                        Technologies: {project.technologies}
                    </span>

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

            </div>

        </div>
    ))}

</section>


           {/* Skills */}
<section className="resume-section">

    <h3>SKILLS</h3>

    {skills.map((skill) => (
        <div className="resume-item" key={skill.id}>

            <div className="item-header">

                <div>

                    <h3>{skill.name}</h3>

                    <span>{skill.category}</span>

                </div>

            </div>

        </div>
    ))}

</section>

{/* Social Links */}
<section className="resume-section">

    <h3>SOCIAL LINKS</h3>

    {socialLinks.map((social) => (
        <div className="resume-item" key={social.id}>

            <div className="item-header">

                <div>

                    <h3>{social.platform}</h3>

                    <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {social.url}
                    </a>

                </div>

            </div>

        </div>
    ))}

</section>


        </div>
    );
}

export default ModernTemplate;

