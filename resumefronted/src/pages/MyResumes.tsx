import { useEffect, useState } from "react";
import {
    deleteResume,
    getMyResumes,
    
    type ResumeResponse
} from "../services/resumeService";
import { useNavigate } from "react-router-dom";


function MyResumes() {

    const [resumes, setResumes] = useState<ResumeResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const handleDelete=async(resumeId:number)=>{
        try{
            await deleteResume(resumeId);
            setResumes(prev=>prev.filter(resume=>resume.id!==resumeId));
        }
        catch(error){
             console.error("Failed to delete resume:", error);
        }

    }

    useEffect(() => {
        const loadResumes = async () => {
            try {
                const data = await getMyResumes();
                setResumes(data);// on re-rendering (after useeffect runs)it shows resumes
            } catch (error) {
                console.error("Failed to load resumes:", error);
            } finally {
                setLoading(false);
            }
        };

        loadResumes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;//one first rendering
    }

    if (resumes.length === 0) {
        return (
            <div className="resumes-content">

                <div className="empty-resume">

                    <i className="bi bi-file-earmark-text"></i>

                    <h2>No resume yet</h2>

                    <p>
                        Create your first resume and start building
                        your professional profile.
                    </p>

                    <button
                        className="resume-primary-btn"
                        onClick={() => navigate("/resume/new")}
                    >
                        <i className="bi bi-plus-lg"></i>
                        Create Resume
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className="page-content">

            <div className="page-header">

                <div>
                    <h1>My Resumes</h1>

                    <p>
                        Create, edit and manage your resumes.
                    </p>
                </div>

                <button
                    className="create-resume-btn"
                    onClick={() => navigate("/resume/new")}
                >
                    <i className="bi bi-plus-lg"></i>
                    Create New Resume
                </button>

            </div>


            <div className="resume-list">

                {resumes.map((resume) => (

                    <div
                        className="resume-list-card"
                        key={resume.id}
                    >

                        {/* Resume Preview */}

                        <div className="resume-list-preview">

                            <div className="preview-name">

                                <h3>{resume.fullName}</h3>
                                 <h6>{resume.jobRole}</h6>

                                <p>{resume.email}</p>

                                <p>{resume.phone}</p>

                                <p>{resume.address}</p>

                                <p>{resume.summary}</p>
                               


                            </div>

                            <div className="preview-line"></div>
                            <div className="preview-line short"></div>

                            <div className="preview-section-title">
                                  EDUCATION 
                            </div>

                            <div className="preview-line"></div>
                            <div className="preview-line"></div>

                            <div className="preview-section-title">
                                EXPERIENCE
                            </div>

                            <div className="preview-line"></div>

                        </div>


                        {/* Resume Information */}

                        <div className="resume-list-info">

                            <div>
                                <h3>
                                    {resume.fullName}'s Resume
                                </h3>

                                <p>
                                    Resume ID: {resume.id}
                                </p>
                            </div>

                            <span className="resume-status">
                                Active
                            </span>

                        </div>


                        {/* Actions */}

                        <div className="resume-list-actions">

                            <button
                                className="edit-btn"
                                onClick={() =>
                                    navigate(`/resume/${resume.id}`)
                                }
                            >
                                <i className="bi bi-pencil"></i>
                                Edit
                            </button>

                            <button className="secondary-btn"
                             onClick={() => navigate(`/templates/${resume.id}`)}>
                                <i className="bi bi-eye"></i>
                                Preview
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={()=>handleDelete(resume.id)}
                                
                            >
                                <i className="bi bi-trash"></i>
                            </button>

                        </div>

                    </div>

                ))}


                {/* Create New Resume */}

                <button
                    className="new-resume-list-card"
                    onClick={() => navigate("/resume/new")}
                >
                    <i className="bi bi-plus-lg"></i>

                    <span>
                        Create New Resume
                    </span>
                </button>

            </div>

        </div>
    );
}

export default MyResumes;