import { useState,useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import { useNavigate, useParams } from "react-router-dom";
import {
    getMyResumes,
    type ResumeResponse
} from "../services/resumeService";

function Templates() {
    const [resumes, setResumes] = useState<ResumeResponse[]>([]);
const [loading, setLoading] = useState(true);

const[selectedTemplate,setSelectedTemplate]=useState("");
const navigate=useNavigate();
const { resumeId } = useParams<{ resumeId: string }>();

const handleUseTemplate=(templateName:string)=>{
      if (resumeId) {
        navigate(`/templates/${templateName}/${resumeId}`);
        return;
    }
   setSelectedTemplate(templateName);
   


}

const handleResumeSelect = (id: number) => {

    if (selectedTemplate) {
        navigate(`/templates/${selectedTemplate}/${id}`);
    }
};
useEffect(() => {

    const loadResumes = async () => {

        try {

            const data = await getMyResumes();

            setResumes(data);

        } catch (error) {

            console.error("Failed to load resumes:", error);

        } finally {

            setLoading(false);

        }

    };

    loadResumes();

}, []);



    return (
        <div>

            <Sidebar />

            <div className="main-area">

                <TopHeader />

                <main className="templates-content">

                    <div className="templates-header">
                        <div>
                            <h1>Resume Templates</h1>
                            <p>
                                Choose a professional design for your resume.
                            </p>

                        </div>
                    </div>


                    <div className="templates-grid">

                        {/* Modern Template */}

                        <div className="template-card">

                            <div className="template-preview modern-preview">

                                <div className="modern-top">
                                    <div className="modern-name">
                                        Bella 
                                    </div>

                                    <div className="modern-role">
                                        Java Full Stack Developer
                                    </div> 

                                    <div className="modern-contact">
                                        email@example.com · +91 9876543210
                                    </div>
                                </div>

                                <div className="template-section">
                                    <span>PROFILE</span>
                                    <div className="template-line"></div>
                                    <div className="template-line"></div>
                                    <div className="template-line short"></div>
                                </div>

                                <div className="template-section">
                                    <span>EXPERIENCE</span>
                                    <div className="template-line"></div>
                                    <div className="template-line"></div>
                                    <div className="template-line short"></div>
                                </div>

                                <div className="template-section">
                                    <span>EDUCATION</span>
                                    <div className="template-line"></div>
                                    <div className="template-line short"></div>
                                </div>

                            </div>

                            <div className="template-info">

                                <div>
                                    <h3>Modern</h3>
                                    <p>Clean and professional design</p>
                                </div>

                                <button className="use-template-btn"
                                onClick={()=>handleUseTemplate("modern")}>
                                    Use Template
                                </button>

                            </div>

                        </div>


                        {/* Classic Template */}

                        <div className="template-card">

                            <div className="template-preview classic-preview">

                                <div className="classic-name">
                                    Bella 
                                </div>

                               <div className="classic-role">
                                    JAVA FULL STACK DEVELOPER
                                </div> 

                                <div className="classic-contact">
                                    email@example.com | Jaipur, India
                                </div>

                                <div className="classic-divider"></div>

                                <div className="template-section">
                                    <span>PROFESSIONAL SUMMARY</span>
                                    <div className="template-line"></div>
                                    <div className="template-line"></div>
                                    <div className="template-line short"></div>
                                </div>

                                <div className="template-section">
                                    <span>EXPERIENCE</span>
                                    <div className="template-line"></div>
                                    <div className="template-line"></div>
                                </div>

                                <div className="template-section">
                                    <span>EDUCATION</span>
                                    <div className="template-line"></div>
                                </div>

                            </div>

                            <div className="template-info">

                                <div>
                                    <h3>Classic</h3>
                                    <p>Traditional and elegant design</p>
                                </div>

                                <button className="use-template-btn"
                                 onClick={() => handleUseTemplate("classic")}>
                                    Use Template
                                </button>

                            </div>

                        </div>


                        {/* Minimal Template */}

                        <div className="template-card">

                            <div className="template-preview minimal-preview">

                                <div className="minimal-name">
                                    Bella
                                </div>

                                 <div className="minimal-role">
                                    Java Full Stack Developer
                                </div> 

                                <div className="minimal-contact">
                                    email@example.com · Jaipur, India
                                </div>

                                <div className="minimal-divider"></div>

                                <div className="template-section">
                                    <span>PROFILE</span>
                                    <div className="template-line"></div>
                                    <div className="template-line"></div>
                                </div>

                                <div className="template-section">
                                    <span>SKILLS</span>

                                    <div className="minimal-skills">
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                    </div>
                                </div>

                                <div className="template-section">
                                    <span>EXPERIENCE</span>
                                    <div className="template-line"></div>
                                    <div className="template-line"></div>
                                </div>

                                <div className="template-section">
                                    <span>EDUCATION</span>
                                    <div className="template-line"></div>
                                </div>

                            </div>

                            <div className="template-info">

                                <div>
                                    <h3>Minimal</h3>
                                    <p>Simple and distraction-free design</p>
                                </div>

                                <button className="use-template-btn"
                                 onClick={() => handleUseTemplate("minimal")}>
                                    Use Template
                                </button>

                            </div>

                        </div>

                    </div>


                    {selectedTemplate && !resumeId && (

                        <div className="resume-selection">

                            <h2>Choose a Resume</h2>

                            <p>
                                Select the resume you want to use with the{" "}
                                <strong>{selectedTemplate}</strong> template.
                            </p>


                            {loading ? (

                                <p>Loading resumes...</p>

                            ) : resumes.length === 0 ? (

                                <p>
                                    You don't have any resumes yet.
                                </p>

                            ) : (

                                <div className="resume-selection-list">

                                    {resumes.map((resume) => (

                                        <div
                                            className="resume-selection-card"
                                            key={resume.id}
                                        >

                                            <div>

                                                <h3>
                                                    {resume.fullName}'s Resume
                                                </h3>

                                                <p>
                                                    {resume.email}
                                                </p>

                                            </div>


                                            <button
                                                className="use-template-btn"
                                                 onClick={() => handleResumeSelect(resume.id)}
                                            >
                                                Use This Resume
                                            </button>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    )}


                </main>

            </div>

        </div>
    );
}

export default Templates;