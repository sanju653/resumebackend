import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import useAuthStore from "../store/authStore";


function Home() {

   const navigate = useNavigate();
const [menuOpen, setMenuOpen] = useState(false);

const closeMenu = () => {
    setMenuOpen(false);
};


const { isLoggedIn } = useAuthStore();

const handleCreateResume = () => {
    if (isLoggedIn) {
        navigate("/resume/new");
    } else {
        navigate("/signup");
    }
};


    return (
        <div className="home-page">

            {/* Navbar */}
           <nav className="home-navbar">

    <div className="home-logo">
        RESUMATE
    </div>


    {/* Desktop Navigation */}
    <div className="home-nav-links">

        <button onClick={() => navigate("/")}>
            Home
        </button>

        <button onClick={() => navigate("/templates")}>
            Templates
        </button>

        <button
            onClick={() => {
                document.querySelector(".home-features")?.scrollIntoView({
                    behavior: "smooth"
                });
            }}
        >
            Features
        </button>

       <button
    onClick={() => {
        if (isLoggedIn) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }}
>
    Dashboard
</button>
    </div>


    {/* Desktop Actions */}
    <div className="home-nav-actions">

        <button
            className="home-login-btn"
            onClick={() => navigate("/login")}
        >
            Login
        </button>

        <button
            className="home-signup-btn"
            onClick={() => navigate("/signup")}
        >
            Sign Up
        </button>

    </div>


    {/* Mobile Menu Button */}
    <button
        className="home-mobile-menu-btn"
        onClick={() => setMenuOpen(true)}
    >
        <i className="bi bi-list"></i>
    </button>


    {/* Mobile Overlay */}
    {menuOpen && (
        <div
            className="home-mobile-overlay"
            onClick={closeMenu}
        ></div>
    )}


    {/* Mobile Menu */}
    <div
        className={`home-mobile-menu ${
            menuOpen ? "home-mobile-menu-open" : ""
        }`}
    >

        <div className="home-mobile-menu-header">

            <div className="home-logo">
                RESUMATE
            </div>

            <button
                className="home-mobile-close"
                onClick={closeMenu}
            >
                <i className="bi bi-x"></i>
            </button>

        </div>


        <div className="home-mobile-links">

            <button
                onClick={() => {
                    navigate("/");
                    closeMenu();
                }}
            >
                Home
            </button>

            <button
                onClick={() => {
                    navigate("/templates");
                    closeMenu();
                }}
            >
                Templates
            </button>

            <button
                onClick={() => {
                    document
                        .querySelector(".home-features")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                    closeMenu();
                }}
            >
                Features
            </button>

            <button
                onClick={() => {
                  if (isLoggedIn) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
        closeMenu();
                }}
            >
                Dashboard
            </button>

        </div>


        <div className="home-mobile-actions">

            <button
                className="home-mobile-login"
                onClick={() => {
                    navigate("/login");
                    closeMenu();
                }}
            >
                Login
            </button>

            <button
                className="home-mobile-signup"
                onClick={() => {
                    navigate("/signup");
                    closeMenu();
                }}
            >
                Sign Up
            </button>

        </div>

    </div>

</nav>


            {/* Hero */}
            <section className="hero-section">

                <div className="hero-content">

                    <span className="hero-label">
                        PROFESSIONAL RESUME BUILDER
                    </span>

              
                  <h1>Hello ...</h1>
                 
                    <h1>
                       
                       Your career deserves
                        <br />
                        a better introduction.
                    </h1>

                    <p>
                        Create a professional resume with clean templates,
                        easy editing, and a live preview.
                    </p>

                    <div className="hero-actions">

                        <button
                            className="hero-primary-btn"
                              onClick={handleCreateResume}
                        >
                            Create My Resume
                            <i className="bi bi-arrow-right"></i>
                        </button>

                        <button
                            className="hero-secondary-btn"
                            onClick={() => navigate("/templates")}
                        >
                            Explore Templates
                        </button>

                    </div>

                </div>


                {/* Resume Preview */}
               <div className="hero-preview-wrapper">

    <div className="hero-resume-paper">

        {/* HEADER */}
        <div className="hero-resume-header">

            <h2>Ira</h2>

           <div>Java  Developer</div>

            <p>
               Pune, India • +91 90000 12345 • alex.morgan@email.com
            </p>

        </div>


        {/* PROFILE */}
        <div className="hero-resume-section">

            <h3>PROFILE</h3>

            <p className="hero-profile-text">
                Passionate Java Full Stack Developer with experience
                building modern web applications using Java,
                Spring Boot, React and MySQL.
            </p>

        </div>


        {/* EXPERIENCE */}
        <div className="hero-resume-section">

            <h3>EXPERIENCE</h3>

            <div className="hero-experience">

                <strong>Java Developer Intern</strong>

                <span>
                    TechNova Solutions · 2025 – 2026
                </span>

                <p>
                    Developed REST APIs using Spring Boot and
                    integrated MySQL databases.
                </p>

            </div>


            <div className="hero-experience">

                <strong>Software Developer Intern</strong>

                <span>
                    CodeSphere Technologies · 2024 – 2025
                </span>

                <p>
                    Built responsive web applications and
                    implemented backend features using Java.
                </p>

            </div>

        </div>


        {/* EDUCATION + SKILLS */}
        <div className="hero-resume-bottom">

            <div className="hero-education">

                <h3>EDUCATION</h3>

                <strong>
                    Bachelor of Computer Applications
                </strong>

                <span>
                    Computer Science · 2023 – 2026
                </span>

                <span>
                    Jaipur University
                </span>

            </div>


            <div className="hero-skills-section">

                <h3>SKILLS</h3>

                <div className="hero-skills">

                    <span>Java</span>
                    <span>Spring Boot</span>
                    <span>React</span>
                    <span>MySQL</span>
                    <span>Git</span>

                </div>

            </div>

        </div>


        {/* FOOTER */}
        <div className="hero-resume-footer">

            <span>Professional Resume</span>

            <span>RESUMATE</span>

        </div>

    </div>

</div>

            </section>


            {/* Features */}
            <section className="home-features">

                <div className="home-section-heading">
                    <span>WHY RESUMATE</span>

                    <h2>
                        Everything you need to create a better resume.
                    </h2>
                </div>


                <div className="feature-grid">

                    <div className="feature-item">

                        <div className="feature-icon">
                            <i className="bi bi-pencil-square"></i>
                        </div>

                        <h3>Easy to Edit</h3>

                        <p>
                            Add and organize your resume information
                            without complicated tools.
                        </p>

                    </div>


                    <div className="feature-item">

                        <div className="feature-icon">
                            <i className="bi bi-layout-text-window"></i>
                        </div>

                        <h3>Professional Templates</h3>

                        <p>
                            Choose a clean and modern design that
                            fits your career.
                        </p>

                    </div>


                    <div className="feature-item">

                        <div className="feature-icon">
                            <i className="bi bi-eye"></i>
                        </div>

                        <h3>Live Preview</h3>

                        <p>
                            See exactly how your resume looks while
                            you build it.
                        </p>

                    </div>

                </div>

            </section>


            {/* How it works */}
            <section className="how-section">

                <div className="home-section-heading">

                    <span>HOW IT WORKS</span>

                    <h2>
                        Create your resume in three simple steps.
                    </h2>

                </div>


                <div className="steps-grid">

                    <div className="step-item">

                        <span className="step-number">
                            01
                        </span>

                        <h3>Choose a Template</h3>

                        <p>
                            Start with a professional template
                            designed for job seekers.
                        </p>

                    </div>


                    <div className="step-item">

                        <span className="step-number">
                            02
                        </span>

                        <h3>Add Your Information</h3>

                        <p>
                            Add your experience, education,
                            projects, skills, and more.
                        </p>

                    </div>


                    <div className="step-item">

                        <span className="step-number">
                            03
                        </span>

                        <h3>Create Your Resume</h3>

                        <p>
                            Review your resume and prepare
                            it for your next opportunity.
                        </p>

                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="home-cta">

                <div>

                    <span>START BUILDING TODAY</span>

                    <h2>
                        Ready to build your resume?
                    </h2>

                    <p>
                        Create a professional resume that represents
                        your skills and experience.
                    </p>

                    <button
                          onClick={handleCreateResume}
                    >
                        Create My Resume
                        <i className="bi bi-arrow-right"></i>
                    </button>

                </div>

            </section>


            {/* Footer */}
            <footer className="home-footer">

                <div className="home-logo">
                    RESUMATE
                </div>

                <p>
                    Build a resume that gets noticed.
                </p>

                <span>
                    © 2026 RESUMATE. All rights reserved.
                </span>

            </footer>

        </div>
    );
}

export default Home;