import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import { useState,useEffect } from "react";
import { getMyProfile } from "../services/userService";

function Dashboard() {



    const navigate=useNavigate();
    const[user,setUser]=useState({name:""});
const[showName,setShowName]=useState(false);


    useEffect(()=>{
       const loadUser=async()=>{
            try{
                const data=await getMyProfile();
                setUser(data);
                setShowName(true);
               

            }
            catch(error){
                console.error("Failed to load user:",error)
            }
        }
        loadUser();
    },[]);

    
    return (
        <div>
            
             <Sidebar />
              <div className="main-area">

                <TopHeader />
                 <main className="dashboard-content">

                       <section className="welcome-section">

                        <div>
                           
                 {showName &&

                  <h1>Hello {user.name}!</h1>
                  }

                            <p>
                                Build a resume that gets noticed.
                            </p>
                        </div>

                        <button className="create-resume-btn" onClick={()=>navigate("/resume/new")}>
                            <i className="bi bi-plus-lg"></i>
                            Create New Resume
                        </button>

                    </section>
                    {/* Your Resumes */}
<section className="resumes-section">

    <div className="section-header">
        <div>
            <h2>Your Resumes</h2>
            <p>Manage and continue working on your resumes.</p>
        </div>

        <button className="view-all-btn"
        onClick={()=>navigate("/resumes")}>
            View all
        </button>
    </div>


    <div className="resume-grid">

        {/* Resume Card */}
        <div className="resume-card">

            <div className="resume-preview">
                <div className="preview-name">
                    <h3>  Bella</h3>
                  
                    <h6>  Graphic Designer</h6>
                </div>

                <div className="preview-line"></div>
                <div className="preview-line short"></div>

                <div className="preview-section-title">
                    EXPERIENCE
                </div>

                <div className="preview-line"></div>
                <div className="preview-line"></div>
                <div className="preview-line short"></div>

                <div className="preview-section-title">
                    EDUCATION
                </div>

                <div className="preview-line"></div>
            </div>


            <div className="resume-info">

                <div>
                    <h3>Software Developer</h3>
                    <span>Updated recently</span>
                </div>

                <div className="resume-menu">
                    <button>
                        <i className="bi bi-three-dots-vertical"></i>
                    </button>
                </div>

            </div>


            <div className="resume-progress">

                <div className="progress-info">
                    <span>Profile completion</span>
                    <strong>85%</strong>
                </div>

                <div className="progress-bar">
                    <div className="progress-fill"></div>
                </div>

            </div>


            <button className="edit-resume-btn">
                Continue Editing
                <i className="bi bi-arrow-right"></i>
            </button>

        </div>


        {/* Create New Resume Card */}
        <button className="new-resume-card" 
        onClick={()=>navigate("/resume/new")}>

            <div className="new-resume-icon">
                <i className="bi bi-plus-lg"></i>
            </div>

            <h3>Create New Resume</h3>

            <p>
                Start with a professional template
            </p>

        </button>

    </div>

</section>

                </main>

               

            </div>
           
        </div>
    );
}

export default Dashboard;