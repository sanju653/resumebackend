import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import { getMyEducation, type EducationResponse } from "../services/educationService";
import {
    getMyResumes,
    type ResumeResponse
} from "../services/resumeService";
import { useEffect, useState } from "react";
import { getMyExperiences, type ExperienceResponse } from "../services/experienceService";
import { getMyProjects, type ProjectResponse } from "../services/projectService";
import { getCertifications, type CertificationResponse } from "../services/certificationService";
import { getSkills, type SkillResponse } from "../services/skillService";
import { getSocialLinks, type SocialLinkResponse } from "../services/socialLinkService";

import {getResumeActivities, type ResumeActivityResponse} from "../services/resumeActivityService";
import { useNavigate } from "react-router-dom";

function Analytics() {

     const [resumes, setResumes] = useState<ResumeResponse[]>([]);
    const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const[educations,setEducations]=useState<EducationResponse[]>([]);
    const[experiences,setExperiences]=useState<ExperienceResponse[]>([]);
    const[skills,setSkills]=useState<SkillResponse[]>([]);
    const[project,setProjects]=useState<ProjectResponse[]>([]);
    const[certifications,setCertifications]=useState<CertificationResponse[]>([]);
    const[socialLinks,setSocialLinks]=useState<SocialLinkResponse[]>([]);
const [activities, setActivities] =useState<ResumeActivityResponse[]>([]);

    const navigate=useNavigate();

 useEffect(() => {

        const loadResumes = async () => {

            try {

                const data = await getMyResumes();

                setResumes(data);

                if (data.length > 0) {
                    setSelectedResumeId(data[0].id);
                }

            } catch (error) {

                console.error("Failed to load resumes:", error);

            } finally {

                setLoading(false);

            }
        };

        loadResumes();


    }, []);



useEffect(() => {

    if (!selectedResumeId) {
        return;
    }

    const loadResumeData = async () => {

        try {

            const [
                educationData,
                skillData,
                projectData,
                experienceData,
                certificationData,
                   activityData
            ] = await Promise.all([
                getMyEducation(selectedResumeId),
                getSkills(selectedResumeId),
                getMyProjects(selectedResumeId),
                getMyExperiences(selectedResumeId),
                getCertifications(selectedResumeId),
                getResumeActivities(selectedResumeId)
            ]);

            setEducations(educationData);
            setSkills(skillData);
            setProjects(projectData);
            setExperiences(experienceData);
            setCertifications(certificationData);
            setActivities(activityData);

        } catch (error) {

            console.error("Failed to load resume analytics:", error);

        }

    };

    loadResumeData();

}, [selectedResumeId]);

    
const getActivityDetails = (type: string) => {

    switch (type) {

        case "RESUME_CREATED":
            return {
                label: "Resume created",
                icon: "bi bi-file-earmark-plus"
            };

        case "RESUME_UPDATED":
            return {
                label: "Resume updated",
                icon: "bi bi-pencil"
            };

        case "TEMPLATE_CHANGED":
            return {
                label: "Template changed",
                icon: "bi bi-palette"
            };

        case "RESUME_DOWNLOADED":
            return {
                label: "Resume downloaded",
                icon: "bi bi-download"
            };

        default:
            return {
                label: "Resume activity",
                icon: "bi bi-clock-history"
            };
    }
};
const formatActivityTime = (dateString: string) => {

    const date = new Date(dateString);
    const now = new Date();

    const difference =
        now.getTime() - date.getTime();

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    if (days === 0) {
        return "Today";
    }

    if (days === 1) {
        return "Yesterday";
    }

    return `${days} days ago`;
};
    //get selected resume by id


const selectedResume=resumes.find((resume)=>resume.id===selectedResumeId);


///calculate personal details

const personalFields=selectedResume?[selectedResume.fullName,
        selectedResume.phone,
        selectedResume.email,
        selectedResume.address,
        selectedResume.summary,
    selectedResume.jobRole]  :[];//ternary op.


        const completedPersonalFields=personalFields
        .filter((field)=>field && field.trim()!=="").length;


        const personalPercentage=personalFields.length>0 ?Math.round((completedPersonalFields/personalFields.length)*100):0;


        //Calculate one education's completion

        const educationPercentages=educations.map((education)=>{
            const fields=[  education.degree,
        education.institution,
        education.location,
        education.startYear,
        education.endYear];

const completedFields=fields.filter((field)=>
    field && field.trim()!==""
).length;
return Math.round((completedFields/fields.length)*100);

        });
//Calculate the overall Education strength


const educationPercentage=educationPercentages.length>0 ?Math.round(
    educationPercentages.reduce((a,b)=>a+b,0)/educationPercentages.length
):0;


        //Calculate one experience's completion
        const experiencePercentages=experiences.map((experience)=>{
            const fields=[experience.jobTitle,experience.company,experience.description,experience.startDate,experience.location];

            const completedFields=fields.filter((field)=>field && field.trim()!=="").length;
            return Math.round((completedFields/fields.length)*100);
        });
        //Calculate the overall Experience strength
        const experiencePercentage=experiencePercentages.length>0 ?Math.round(
           experiencePercentages.reduce((a,b)=>a+b,0)/experiencePercentages.length
        ):0;

        //projects

        const projectPercentages = project.map((project) => {

    const fields = [
        project.title,
        project.description,
        project.technologies,
        project.githubUrl,
        project.liveUrl
    ];

    const completedFields = fields.filter(
        (field) => field && field.trim() !== ""
    ).length;

    return Math.round(
        (completedFields / fields.length) * 100
    );
});

            const projectPercentage =
    projectPercentages.length > 0
        ? Math.round(
            projectPercentages.reduce(
                (total, percentage) => total + percentage,
                0
            ) / projectPercentages.length
        )
        : 0;

        const resumePercentage = Math.round(
    (
        personalPercentage +
        educationPercentage +
        experiencePercentage +
        projectPercentage 
       
    ) / 4
);

const uniqueActivities = activities.filter(
    (activity, index, array) => {

        if (index === 0) {
            return true;
        }

        return (
            activity.activityType !==
            array[index - 1].activityType
        );
    }
);

const improvements=[
   {
        show: personalPercentage < 100,
        icon: "bi bi-person",
        title: "Complete personal information",
        description:
            "Add your name, phone, email, address and professional summary.",
             section: "personal",
    },
        {
        show: educationPercentage < 100,
        icon: "bi bi-mortarboard",
        title: "Complete education details",
        description:
            "Make sure your degree, institution and study years are added.",
        section: "education",
    },

       {
        show: experiencePercentage === 0,
        icon: "bi bi-briefcase",
        title: "Add work experience",
        description:
            "Add internships or work experience to strengthen your resume.",
            section: "experience",
    },
     {
        show: projectPercentage < 100,
        icon: "bi bi-folder",
        title: "Improve project details",
        description:
            "Add technologies, project descriptions and GitHub or live links.",
             section: "projects",
            
    },
      {
        show: skills.length === 0,
        icon: "bi bi-code-slash",
        title: "Add skills",
        description:
            "Add relevant technical and professional skills.",
             section: "skills",
    },
    {
        show: certifications.length === 0,
        icon: "bi bi-award",
        title: "Add certifications",
        description:
            "Add relevant certifications to strengthen your profile.",
                    section: "certifications",

    }
];
const activeImprovements = improvements.filter(
    (item) => item.show
);

     
    return (
        <div>

            <Sidebar />

            <div className="main-area">

                <TopHeader />

                <main className="analytics-content">

                    {/* Page Header */}

                    <div className="analytics-page-header">
                        <div>
                            <h1>Analytics</h1>
                            <p>
                                Track your resume progress and profile strength.
                            </p>
                        </div>



                                        <select
                        className="analytics-period-btn"
                        value={selectedResumeId ?? ""}
                        onChange={(e) =>
                            setSelectedResumeId(Number(e.target.value))
                        }
                    >
                        {resumes.map((resume) => (
                            <option key={resume.id} value={resume.id}>
                                {resume.jobRole|| `Resume ${resume.id}`}
                            </option>
                        ))}
                    </select>

                    </div>


                    {/* Overview */}

                    <section className="analytics-overview">

                        <div className="analytics-stat">
                            <div className="stat-icon">
                                <i className="bi bi-file-earmark-text"></i>
                            </div>

                            <div>
                                <span>Total Resumes</span>
                                <strong>{resumes.length}</strong>
                            </div>
                        </div>


                        <div className="analytics-stat">
                            <div className="stat-icon">
                                <i className="bi bi-check2-circle"></i>
                            </div>

                            <div>
                                <span>Profile Completion</span>
                                <strong>{resumePercentage}%</strong>
                            </div>
                        </div>


                        <div className="analytics-stat">
                            <div className="stat-icon">
                                <i className="bi bi-code-slash"></i>
                            </div>

                            <div>
                                <span>Skills Added</span>
                                <strong>{skills.length}</strong>
                            </div>
                        </div>


                        <div className="analytics-stat">
                            <div className="stat-icon">
                                <i className="bi bi-folder"></i>
                            </div>

                            <div>
                                <span>Projects Added</span>
                                <strong>{project.length}</strong>
                            </div>
                        </div>

                    </section>


                    {/* Main Analytics */}

                    <div className="analytics-grid">

                        {/* Resume Strength */}

                        <section className="analytics-card">

                            <div className="analytics-card-header">
                                <div>
                                    <h2>Resume Strength</h2>
                                    <p>
                                        How complete your resume is.
                                    </p>
                                </div>
                            </div>

                            <div className="strength-content">

                                <div className="strength-circle" style={{
        background: `conic-gradient(#0d6efd ${resumePercentage}%, #e9ecef ${resumePercentage}% 100%)`
    }}>
                                    <div >
                                        <strong>{resumePercentage}%</strong>
                                        <span>Complete</span>
                                    </div>
                                </div>

                                <div className="strength-details">

                                    <div className="strength-item">
                                        <span>Personal Information</span>
                                        <strong>{personalPercentage}%</strong>
                                    </div>

                                    <div className="strength-progress">
                                        <div
                                         style={{ width:`${personalPercentage}%` }}>

                                         </div>
                                    </div>


                                    <div className="strength-item">
                                        <span>Experience</span>
                                        <strong>{experiencePercentage}</strong>
                                    </div>

                                    <div className="strength-progress">
                                        <div style={{ width: `${experiencePercentage}%` }}></div>
                                    </div>


                                    <div className="strength-item">
                                        <span>Education</span>
                                         <strong>{educationPercentage}%</strong>
                                    </div>

                                    <div className="strength-progress">
                                        <div  style={{
            width: `${educationPercentage}%`
        }}></div>
                                    </div>


                                    <div className="strength-item">
                                        <span>Projects</span>
                                        <strong>{projectPercentage}%</strong>
                                    </div>

                                    <div className="strength-progress">
                                        <div  style={{
            width: `${projectPercentage}%`
        }}></div>
                                    </div>

                                </div>

                            </div>

                        </section>


                        {/* Activity */}

                      <section className="analytics-card">

    <div className="analytics-card-header">
        <div>
            <h2>Resume Activity</h2>
            <p>
                Your recent resume activity.
            </p>
        </div>
    </div>

    <div className="activity-list">

        {uniqueActivities.length === 0 ? (

            <div className="activity-empty">
                No activity yet.
            </div>

        ) : (

            uniqueActivities
                .slice(0, 4)
                .map((activity) => {

                    const details = getActivityDetails(
                        activity.activityType
                    );

                    return (
                        <div
                            className="activity-item"
                            key={activity.id}
                        >

                            <div className="activity-icon">

                                <i
                                    className={details.icon}
                                ></i>

                            </div>

                            <div>

                                <strong>
                                    {details.label}
                                </strong>

                                <span>
                                    {formatActivityTime(
                                        activity.createdAt
                                    )}
                                </span>

                            </div>

                        </div>
                    );
                })

        )}

    </div>

</section>

                    </div>


                    {/* Improvement Section */}

                    <section className="analytics-card improvement-card">

                        <div className="analytics-card-header">
                            <div>
                                <h2>Improve Your Resume</h2>
                                <p>
                                    A few things you can add to make your resume stronger.
                                </p>
                            </div>
                        </div>

                   <div className="improvement-list">

    {activeImprovements.length === 0 ? (

        <div className="improvement-complete">
            <i className="bi bi-check-circle-fill"></i>

            <div>
                <p>Your resume is complete!  All major resume sections have been filled in.</p>

                {/* <span>
                    All major resume sections have been filled in.
                </span> */}
            </div>
        </div>

    ) : (

        activeImprovements.map((item, index) => (

            <div
                className="improvement-item"
                key={index}
                onClick={() => {
                    navigate(
                        `/resume/${selectedResumeId}#${item.section}`
                    );
                }}
            >

                <i className={item.icon}></i>

                <div>
                    <strong>{item.title}</strong>

                    <span>{item.description}</span>
                </div>

            </div>

        ))

    )}

</div>

                    </section>

                </main>

            </div>

        </div>
    );
}

export default Analytics;