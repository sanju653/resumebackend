import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import { useEffect,useState,useCallback } from "react";
import Education from "../components/Education";
import { createResume, getResumeById ,updateResume} from "../services/resumeService";
import { useParams } from "react-router-dom";
import Experience from "../components/Experience";
import Project from "../components/Project";
import Skill from "../components/Skill";
import Certification from "../components/Certification";
import SocialLink from "../components/SocialLink";
import { getMyEducation, type EducationResponse } from "../services/educationService";
import { getMyExperiences, type ExperienceResponse } from "../services/experienceService";
import { getMyProjects, type ProjectResponse } from "../services/projectService";
import { getSkills, type SkillResponse } from "../services/skillService";
import { getCertifications, type CertificationResponse } from "../services/certificationService";
import { getSocialLinks, type SocialLinkResponse } from "../services/socialLinkService";
import { useNavigate } from "react-router-dom";
function ResumeEditor() {

const [fullName, setFullName] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
const [address, setAddress] = useState("");
const [summary, setSummary] = useState("");
const[jobRole,setJobRole]=useState("");
const[errors,setErrors]=useState({fullName: "",
    email: "",
    phone: "",
    jobRole: ""});

const {resumeId}=useParams();
const navigate = useNavigate();

const [educations, setEducations] = useState<EducationResponse[]>([]);
const [experiences, setExperiences] = useState<ExperienceResponse[]>([]);
const [projects, setProjects] = useState<ProjectResponse[]>([]);
const [skills, setSkills] = useState<SkillResponse[]>([]);
const [certifications, setCertifications] = useState<CertificationResponse[]>([]);
const [socialLinks, setSocialLinks] = useState<SocialLinkResponse[]>([]);


const validateResume=()=>{
    const newErrors = {
        fullName: "",
        email: "",
        phone: "",
        jobRole: ""
    };

    let isValid=true;
    if(!fullName.trim()){
        newErrors.fullName = "Full name is required";
        isValid = false;
    }

    if (!email.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
    }

    if (!phone.trim()) {
        newErrors.phone = "Phone number is required";
        isValid = false;
    }

    if (!jobRole.trim()) {
        newErrors.jobRole = "Job role is required";
        isValid = false;
    }
     setErrors(newErrors);

    return isValid;

};
const handleSave=async()=>{
    if (!validateResume()) {
        return;
    }
    const resumeData={   fullName, phone,  email,address, summary,jobRole };

   
    try{
         if (resumeId && resumeId!=="new") {

            // Editing existing resume
            const data = await updateResume(
                Number(resumeId),
                resumeData
            );
             console.log("Resume updated:", data);
            }

             else{

        const data=await createResume(resumeData);
         console.log("Resume created:", data);
         // // Go to the newly created resume
         navigate(`/resume/${data.id}`);
             }

       

    } catch (error) {

        console.error("Failed to save  resume:", error);

    }
};
const loadEducation = useCallback(async () => {
    if (!resumeId) return;

    try {
        const educationData = await getMyEducation(Number(resumeId));
        setEducations(educationData);
    } catch (error) {
        console.error("Failed to load education:", error);
    }
},[resumeId]);



const loadExperience = useCallback(async () => {

    if (!resumeId) return;

    try {

        const experienceData =
            await getMyExperiences(Number(resumeId));

        setExperiences(experienceData);

    } catch (error) {

        console.error(
            "Failed to load experience:",
            error
        );

    }

}, [resumeId]);

const loadProjects = useCallback(async () => {

    if (!resumeId) return;

    try {

        const projectData =
            await getMyProjects(Number(resumeId));

        setProjects(projectData);

    } catch (error) {

        console.error(
            "Failed to load projects:",
            error
        );

    }

}, [resumeId]);

const loadSkills = useCallback(async () => {

    if (!resumeId) return;

    try {

        const skillData =
            await getSkills(Number(resumeId));

        setSkills(skillData);

    } catch (error) {

        console.error(
            "Failed to load skills:",
            error
        );

    }

}, [resumeId]);

const loadCertifications = useCallback(async () => {

    if (!resumeId) return;

    try {

        const certificationData =
            await getCertifications(Number(resumeId));

        setCertifications(certificationData);

    } catch (error) {

        console.error(
            "Failed to load certifications:",
            error
        );

    }

}, [resumeId]);

const loadSocialLinks = useCallback(async () => {

    if (!resumeId) return;

    try {

        const socialLinkData =
            await getSocialLinks(Number(resumeId));

        setSocialLinks(socialLinkData);

    } catch (error) {

        console.error(
            "Failed to load social links:",
            error
        );

    }

}, [resumeId]);

useEffect(()=>{
    if(!resumeId || resumeId === "new")return;
    const loadResume=async()=>{
        try{
            const data= await getResumeById(Number(resumeId));
             setFullName(data.fullName);
            setPhone(data.phone);
            setEmail(data.email);
            setAddress(data.address);
            setSummary(data.summary);
            setJobRole(data.jobRole);


           await Promise.all([
                loadEducation(),
                loadExperience(),
                loadProjects(),
                loadSkills(),
                loadCertifications(),
                loadSocialLinks()
            ]);



        }
        catch (error) {
            console.error("Failed to load resume  preview data:", error);
        }
        
    };
    loadResume();
},[ resumeId,
    loadEducation,
    loadExperience,
    loadProjects,
    loadSkills,
    loadCertifications,
    loadSocialLinks]);


    useEffect(() => {

    const sectionId = window.location.hash.substring(1);

    if (!sectionId) {
        return;
    }

    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

}, []);

    return (
        <div>

            <Sidebar />

            <div className="main-area">

                <TopHeader />

                <main className="editor-content">

                    <div className="editor-header">
                        <div>
                            <h1>Resume Editor</h1>
                            <p>Build your professional resume.</p>
                        </div>

                        <button className="save-resume-btn" onClick={handleSave}>
                            <i className="bi bi-check-lg"></i>
                            Save Resume
                        </button>
                    </div>


                    <div className="editor-layout">

                        {/* LEFT - FORM */}
                        <div className="editor-form">

                            <section className="form-section" id="personal">

                                <div className="form-section-header">
                                    <div>
                                        <h2>Personal Information</h2>
                                        <p>
                                            Add your basic contact information.
                                        </p>
                                    </div>
                                </div>


                                <div className="form-row">

                                    <div className="form-group">
                                        <label>Full Name <span className="text-danger">*</span></label>

                                        <input
                                            type="text"
                                               className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                                            placeholder="Enter your full name"
                                            value={fullName}
                                    onChange={(e) => {
                                        setFullName(e.target.value);

                                        if (e.target.value.trim()) {
                                            setErrors(prev => ({
                                                ...prev,
                                                fullName: ""
                                            }));
                                        }
                                    }}
                                        />
                                        {errors.fullName && (
    <div className="invalid-feedback">
        {errors.fullName}
    </div>
)}

                                    </div>


                                    <div className="form-group">
                                        <label>Email <span className="text-danger">*</span></label>

                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                            placeholder="Enter your email"
                                             value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);

                                if (e.target.value.trim()) {
                                    setErrors(prev => ({
                                        ...prev,
                                        email: ""
                                    }));
                                }
                            }}
                        />
                               {errors.email && (
                                <div className="invalid-feedback">
                                    {errors.email}
                                </div>
                            )}                                 
                                    </div>

                                </div>
                                <div>
                                    <div className="form-group">
                                       <label>
    Job Role <span className="text-danger">*</span>
</label>

                                        <input
                                            type="text"
                                            placeholder="Enter your job role"
                                             className={`form-control ${errors.jobRole ? "is-invalid" : ""}`}
                                             value={jobRole}
                                    onChange={(e) => {
        setJobRole(e.target.value);

        if (e.target.value.trim()) {
            setErrors(prev => ({
                ...prev,
                jobRole: ""
            }));
        }
    }}
/>{errors.jobRole && (
    <div className="invalid-feedback">
        {errors.jobRole}
    </div>
)}
                                    </div>
                                </div>


                                <div className="form-row">

                                    <div className="form-group">
                                       <label>
    Phone <span className="text-danger">*</span>
</label>

<input
    type="text"
    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
    placeholder="Enter your phone number"
    value={phone}
    onChange={(e) => {
        setPhone(e.target.value);

        if (e.target.value.trim()) {
            setErrors(prev => ({
                ...prev,
                phone: ""
            }));
        }
    }}
/>

{errors.phone && (
    <div className="invalid-feedback">
        {errors.phone}
    </div>
)}

                                    </div>


                                    <div className="form-group">
                                        <label>Address</label>

                                        <input
                                            type="text"
                                            placeholder="Enter your address"
                                                value={address}
    onChange={(e) => setAddress(e.target.value)}

                                        />
                                    </div>

                                </div>


                                <div className="form-group">

                                    <label>Professional Summary</label>

                                    <textarea
                                        rows={5}
                                        placeholder="Write a short professional summary..."
                                         value={summary}
    onChange={(e) => setSummary(e.target.value)}
                                    ></textarea>

                                </div>

                            </section>

{resumeId && resumeId !== "new" && (
    <>
       <div id="education">
    <Education onChange={loadEducation}/>
</div>
      <div id="experience">
    <Experience onChange={loadExperience}/>
</div>

      <div id="skills">
    <Skill onChange={loadSkills}/>
</div>
     <div id="projects">
    <Project onChange={loadProjects}/>
</div>
       <div id="certifications">
    <Certification onChange={loadCertifications}/>
</div>

      <div id="socialLinks">
    <SocialLink onChange={loadSocialLinks}/>
</div>
    </>
)}






                        </div>



                        


                        {/* RIGHT - PREVIEW */}

                        <div className="editor-preview">

                            <div className="preview-header">
                                <span>Live Preview</span>

                                <button>
                                    <i className="bi bi-eye"></i>
                                    Preview
                                </button>
                            </div>


                          <div className="resume-paper">

    {/* Resume Header */}

    <div className="resume-preview-header">

        <h2>{fullName || "Your Name"}</h2>

         <p className="resume-role">
            {jobRole|| "Your Job Role"}
        </p> 

        <div className="resume-contact">

            <span>
                <i className="bi bi-envelope"></i>
                {email || "email@example.com"}
            </span>

            <span>
                <i className="bi bi-telephone"></i>
                {phone || "+91 XXXXX XXXXX"}
            </span>

            <span>
                <i className="bi bi-geo-alt"></i>
              {address || "Your Location"}
            </span>

        </div>

    </div>


    {/* Summary */}

    <div className="resume-preview-section">

        <h4>PROFILE</h4>

        <p>
             {summary || "Your professional summary will appear here."}
        </p>

    </div>

  {/* Education */}

    <div className="resume-preview-section">

        <h4>EDUCATION</h4>
          {educations.length === 0 ? (

        <p className="text-muted">
            No education added yet.
        </p>

    ) : (
        educations.map((education) => (


        <div className="resume-item"  key={education.id}>

            <div className="resume-item-heading">

                <strong>  {education.degree}</strong>

                <span>  {education.startYear} – {education.endYear}</span>

            </div>

            <p className="resume-company">
                {education.institution}
                    {education.location &&
                        ` · ${education.location}`}
            </p>

        </div>
            ))

    )}

    </div>

    {/* Experience */}

   <div className="resume-preview-section">

    <h4>EXPERIENCE</h4>

    {experiences.length === 0 ? (

        <p className="text-muted">
            No experience added yet.
        </p>

    ) : (

        experiences.map((experience) => (

            <div
                className="resume-item"
                key={experience.id}
            >

                <div className="resume-item-heading">

                    <strong>
                        {experience.jobTitle}
                    </strong>

                    <span>
                        {experience.startDate} – {experience.endDate}
                    </span>

                </div>

                <p className="resume-company">

                    {experience.company}

                    {experience.location &&
                        ` · ${experience.location}`}

                </p>

                {experience.description && (

                    <p>
                        {experience.description}
                    </p>

                )}

            </div>

        ))

    )}

</div>

    {/* Skills */}
<div className="resume-preview-section">
     <h4>SKILLS</h4>

    {skills.length === 0 ? (


        <p className="text-muted">
            No skills added yet.
        </p>

    ) : (

          <div className="d-flex flex-wrap gap-2">

            {skills.map((skill) => (

                <span
                    key={skill.id}
                    className="badge bg-light text-dark border px-3 py-2"
                >
                    {skill.name}
                </span>

            ))}

        </div>

    )}

</div>

    {/* Projects */}

    <div className="resume-preview-section">

    <h4>PROJECTS</h4>

    {projects.length === 0 ? (

        <p className="text-muted">
            No projects added yet.
        </p>

    ) : (

        projects.map((project) => (

            <div
                className="resume-item"
                key={project.id}
            >

                <div className="resume-item-heading">

                    <strong>
                        {project.title}
                    </strong>

                </div>

                {project.technologies && (

                    <p className="resume-company">
                        {project.technologies}
                    </p>

                )}

                {project.description && (

                    <p>
                        {project.description}
                    </p>

                )}

                <div>

                    {project.githubUrl && (

                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="me-3"
                        >
                            <i className="bi bi-github"></i>{" "}
                            GitHub
                        </a>

                    )}

                    {project.liveUrl && (

                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-box-arrow-up-right"></i>{" "}
                            Live Demo
                        </a>

                    )}

                </div>

            </div>

        ))

    )}

</div>


{/* {certification} */}
<div className="resume-preview-section">

    <h4>CERTIFICATIONS</h4>

    {certifications.length === 0 ? (

        <p className="text-muted">
            No certifications added yet.
        </p>

    ) : (

        certifications.map((certification) => (

            <div
                className="resume-item"
                key={certification.id}
            >

                <div className="resume-item-heading">

                    <strong>
                        {certification.name}
                    </strong>

                    <span>
                        {certification.issueDate}
                    </span>

                </div>

                <p className="resume-company">
                    {certification.issuingOrganization}
                </p>

                {certification.credentialUrl && (

                    <a
                        href={certification.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="bi bi-box-arrow-up-right"></i>{" "}
                        View Credential
                    </a>

                )}

            </div>

        ))

    )}

</div>

{/* socilalinks */}
<div className="resume-preview-section">

    <h4>SOCIAL LINKS</h4>

  

        {socialLinks.length === 0 ? (

            <p className="text-muted small mb-0">
                No social links added yet.
            </p>

        ) : (

            socialLinks.map((link) => (

                <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-3"
                >
                    {link.platform}
                </a>

            ))

        )}



</div>

</div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default ResumeEditor;