import { useState, useEffect } from "react";
import {
    addProject,
    updateProject,
    getMyProjects,
    deleteProject,
    type ProjectRequest,
    type ProjectResponse
} from "../services/projectService";
import { useParams } from "react-router-dom";

interface ProjectProps {
    onChange?: () => void;
}

function Project({ onChange }: ProjectProps) {

    const [project, setProject] = useState<ProjectRequest>({
        title: "",
        description: "",
        technologies: "",
        githubUrl: "",
        liveUrl: ""
    });

    const [projects, setProjects] = useState<ProjectResponse[]>([]);

    const [projectEditingId, setProjectEditingId] = useState<number | null>(null);

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        technologies: ""
    });

    const { resumeId } = useParams<{ resumeId: string }>();


    useEffect(() => {

        if (!resumeId || resumeId === "new") {
            return;
        }

        const loadProjects = async () => {

            try {

                const data = await getMyProjects(Number(resumeId));

                setProjects(data);

            } catch (error) {

                console.error("Failed to load projects", error);

            }

        };

        loadProjects();

    }, [resumeId]);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        const { name, value } = e.target;

        setProject({
            ...project,
            [name]: value
        });

        if (value.trim()) {

            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));

        }

    };


    const validateProject = () => {

        const newErrors = {
            title: "",
            description: "",
            technologies: ""
        };

        let isValid = true;


        if (!project.title.trim()) {

            newErrors.title = "Project title is required";

            isValid = false;

        }


        if (!project.description.trim()) {

            newErrors.description = "Project description is required";

            isValid = false;

        }


        if (!project.technologies.trim()) {

            newErrors.technologies = "Technologies are required";

            isValid = false;

        }


        setErrors(newErrors);

        return isValid;

    };


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        if (!validateProject()) {
            return;
        }

        try {

            if (!resumeId || resumeId === "new") {

                alert("Resume id is missing");

                return;

            }


            if (projectEditingId !== null) {

                const updatedProject = await updateProject(
                    Number(resumeId),
                    projectEditingId,
                    project
                );

                setProjects(prev =>
                    prev.map(proj =>
                        proj.id === projectEditingId
                            ? updatedProject
                            : proj
                    )
                );

                alert("Project updated successfully!");

                setProjectEditingId(null);

                setProject({
                    title: "",
                    description: "",
                    technologies: "",
                    githubUrl: "",
                    liveUrl: ""
                });

                setErrors({
                    title: "",
                    description: "",
                    technologies: ""
                });

                onChange?.();

            } else {

                const savedProject = await addProject(
                    Number(resumeId),
                    project
                );

                setProjects([
                    ...projects,
                    savedProject
                ]);

                alert("Project added successfully!");

                setProject({
                    title: "",
                    description: "",
                    technologies: "",
                    githubUrl: "",
                    liveUrl: ""
                });

                setErrors({
                    title: "",
                    description: "",
                    technologies: ""
                });

                onChange?.();

            }

        } catch (error) {

            console.error(
                "Failed to save project:",
                error
            );

        }

    };


    const handleEdit = (data: ProjectResponse) => {

        setProjectEditingId(data.id);

        setProject({
            title: data.title,
            description: data.description,
            technologies: data.technologies,
            githubUrl: data.githubUrl,
            liveUrl: data.liveUrl
        });

        setErrors({
            title: "",
            description: "",
            technologies: ""
        });

    };


    const handleDelete = async (projectId: number) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            if (!resumeId || resumeId === "new") {

                alert("Resume ID is missing");

                return;

            }

            await deleteProject(
                Number(resumeId),
                projectId
            );

            setProjects(prev =>
                prev.filter(proj => proj.id !== projectId)
            );

            if (projectEditingId === projectId) {

                setProjectEditingId(null);

                setProject({
                    title: "",
                    description: "",
                    technologies: "",
                    githubUrl: "",
                    liveUrl: ""
                });

                setErrors({
                    title: "",
                    description: "",
                    technologies: ""
                });

            }

            onChange?.();

            alert("Project deleted successfully!");

        } catch (error) {

            console.error(
                "Failed to delete project:",
                error
            );

        }

    };


    const handleCancelEdit = () => {

        setProjectEditingId(null);

        setProject({
            title: "",
            description: "",
            technologies: "",
            githubUrl: "",
            liveUrl: ""
        });

        setErrors({
            title: "",
            description: "",
            technologies: ""
        });

    };


    return (

        <div className="card p-4">

            <h4 className="mb-4">
                Projects
            </h4>


            <form onSubmit={handleSubmit}>

                {/* Project Title */}

                <div className="mb-3">

                    <label className="form-label">
                        Project Title{" "}
                        <span className="text-danger">*</span>
                    </label>

                    <input
                        type="text"
                        name="title"
                        className={`form-control ${
                            errors.title ? "is-invalid" : ""
                        }`}
                        value={project.title}
                        onChange={handleChange}
                    />

                    {errors.title && (
                        <div className="invalid-feedback">
                            {errors.title}
                        </div>
                    )}

                </div>


                {/* Description */}

                <div className="mb-3">

                    <label className="form-label">
                        Description{" "}
                        <span className="text-danger">*</span>
                    </label>

                    <textarea
                        name="description"
                        className={`form-control ${
                            errors.description ? "is-invalid" : ""
                        }`}
                        rows={4}
                        value={project.description}
                        onChange={handleChange}
                    />

                    {errors.description && (
                        <div className="invalid-feedback">
                            {errors.description}
                        </div>
                    )}

                </div>


                {/* Technologies */}

                <div className="mb-3">

                    <label className="form-label">
                        Technologies{" "}
                        <span className="text-danger">*</span>
                    </label>

                    <input
                        type="text"
                        name="technologies"
                        className={`form-control ${
                            errors.technologies ? "is-invalid" : ""
                        }`}
                        value={project.technologies}
                        onChange={handleChange}
                    />

                    {errors.technologies && (
                        <div className="invalid-feedback">
                            {errors.technologies}
                        </div>
                    )}

                </div>


                {/* GitHub URL */}

                <div className="mb-3">

                    <label className="form-label">
                        GitHub URL
                    </label>

                    <input
                        type="text"
                        name="githubUrl"
                        className="form-control"
                        value={project.githubUrl}
                        onChange={handleChange}
                    />

                </div>


                {/* Live URL */}

                <div className="mb-3">

                    <label className="form-label">
                        Live Project URL
                    </label>

                    <input
                        type="text"
                        name="liveUrl"
                        className="form-control"
                        value={project.liveUrl}
                        onChange={handleChange}
                    />

                </div>


                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {projectEditingId !== null
                        ? "Update Project"
                        : "Add Project"
                    }
                </button>


                {projectEditingId !== null && (

                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={handleCancelEdit}
                    >
                        Cancel
                    </button>

                )}

            </form>


            {/* Saved Projects */}

            <div className="mt-4">

                <h5 className="mb-3">
                    Saved Projects
                </h5>


                {projects.length === 0 ? (

                    <p className="text-muted">
                        No projects added yet.
                    </p>

                ) : (

                    projects.map((item) => (

                        <div
                            key={item.id}
                            className="border rounded p-3 mb-3"
                        >

                            <h6 className="mb-1">
                                {item.title}
                            </h6>


                            <div className="text-muted">
                                {item.technologies}
                            </div>


                            <p className="mt-2 mb-0">
                                {item.description}
                            </p>


                            <div className="mt-2">

                                {item.githubUrl && (

                                    <a
                                        href={item.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="me-3"
                                    >
                                        <i className="bi bi-github"></i>
                                        {" "}GitHub
                                    </a>

                                )}


                                {item.liveUrl && (

                                    <a
                                        href={item.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="bi bi-box-arrow-up-right"></i>
                                        {" "}Live Demo
                                    </a>

                                )}

                            </div>


                            <div className="mt-3">

                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary me-2"
                                    onClick={() => handleEdit(item)}
                                >
                                    <i className="bi bi-pencil"></i>
                                    {" "}Edit
                                </button>


                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <i className="bi bi-trash"></i>
                                    {" "}Delete
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );
}

export default Project;