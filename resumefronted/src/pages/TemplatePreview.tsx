import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getResumeById,
    type ResumeResponse
} from "../services/resumeService";
import ModernTemplate from "../templates/ModernTemplate";
import {
    getMyEducation,
    type EducationResponse
} from "../services/educationService";

import {
    getMyExperiences,
    type ExperienceResponse
} from "../services/experienceService";

import {
    getMyProjects,
    type ProjectResponse
} from "../services/projectService";

import {
    getSkills,
    type SkillResponse
} from "../services/skillService";

import {
    getSocialLinks,
    type SocialLinkResponse
} from "../services/socialLinkService";
import ClassicTemplate from "../templates/ClassicTemplate";
import MinimalTemplates from "../templates/MinimalTemplates";
import { getSettings } from "../services/settingservice";

function TemplatePreview() {

    const { templateName, resumeId } = useParams<{
        templateName: string;
        resumeId: string;
    }>();

    const navigate=useNavigate();
const [accentColor, setAccentColor] = useState("blue");
    const [resume, setResume] = useState<ResumeResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [education, setEducation] = useState<EducationResponse[]>([]);
    const [experience, setExperience] =
    useState<ExperienceResponse[]>([]);

const [projects, setProjects] =
    useState<ProjectResponse[]>([]);

const [skills, setSkills] =
    useState<SkillResponse[]>([]);

const [socialLinks, setSocialLinks] =
    useState<SocialLinkResponse[]>([]);

    useEffect(() => {

        const loadResume = async () => {

            if (!resumeId) {
                setError("Resume ID is missing.");
                setLoading(false);
                return;
            }

            try {

                const data = await getResumeById(Number(resumeId));

                setResume(data);
                   const settingsData = await getSettings();
    setAccentColor(settingsData.accentColor);

                const educationData = await getMyEducation(Number(resumeId));
                    setEducation(educationData);

                    const experienceData =await getMyExperiences(Number(resumeId));
                    setExperience(experienceData);

                        const projectData =
                            await getMyProjects(Number(resumeId));

                        setProjects(projectData);

                        const skillData =
                            await getSkills(Number(resumeId));

                        setSkills(skillData);

                        const socialLinkData =
                            await getSocialLinks(Number(resumeId));

                        setSocialLinks(socialLinkData);

            } catch (error) {

                console.error("Failed to load resume:", error);
                setError("Failed to load resume.");

            } finally {

                setLoading(false);
            }
        };

        loadResume();

    }, [resumeId]);


    if (loading) {
        return <p>Loading resume...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!resume) {
        return <p>Resume not found.</p>;
    }


   return (
    <div className="template-preview-page">

        {/* Preview Toolbar */}
        <div className="preview-toolbar">

            <button
                className="preview-back-btn"
                onClick={() => navigate("/templates")}
            >
                <i className="bi bi-arrow-left"></i>
                Back to Templates
            </button>

            <div className="preview-actions">

                <button
                    className="preview-print-btn"
                    onClick={() => window.print()}
                >
                    <i className="bi bi-download"></i>
                    Download / Print
                </button>

            </div>

        </div>

        {/* Resume */}
        <div className="resume-preview-container">

            {templateName === "modern" && (
                <ModernTemplate
                    resume={resume}
                    education={education}
                    experience={experience}
                    projects={projects}
                    skills={skills}
                    socialLinks={socialLinks}
                    accentColor={accentColor}

                    
                />
            )}

            //
            {templateName === "classic" && (
    <ClassicTemplate
        resume={resume}
        education={education}
        experience={experience}
        projects={projects}
        skills={skills}
        socialLinks={socialLinks}
        accentColor={accentColor}
    />
)}
{templateName === "minimal" && (
    <MinimalTemplates
        resume={resume}
        education={education}
        experience={experience}
        projects={projects}
        skills={skills}
        socialLinks={socialLinks}
        accentColor={accentColor}
    />
)}

        </div>

    </div>
);
}

export default TemplatePreview;