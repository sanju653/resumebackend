import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    createExperience,
    getMyExperiences,
    updateExperience,
    deleteExperience,
    type ExperienceRequest,
    type ExperienceResponse
} from "../services/experienceService";

interface ExperienceProps {
    onChange?: () => void;
}

function Experience({ onChange }: ExperienceProps) {

    const [experience, setExperience] =
        useState<ExperienceRequest>({
            jobTitle: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            description: ""
        });

    const { resumeId } =
        useParams<{ resumeId: string }>();

    // Store all saved experiences
    const [experiences, setExperiences] =
        useState<ExperienceResponse[]>([]);

    // Store the id of experience currently being edited
    const [editingExperienceId, setEditingExperienceId] =
        useState<number | null>(null);

    // Store validation errors
    const [errors, setErrors] = useState({
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: ""
    });


    useEffect(() => {

        if (!resumeId || resumeId === "new") {
            return;
        }

        const loadExperiences = async () => {

            try {

                const data =
                    await getMyExperiences(Number(resumeId));

                setExperiences(data);

            } catch (error) {

                console.error(
                    "Failed to load experiences:",
                    error
                );

            }
        };

        loadExperiences();

    }, [resumeId]);


    // Take what the user types and store it in React state
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {

        const { name, value } = e.target;

        setExperience({
            ...experience,
            [name]: value
        });

        // Remove error when user enters a value
        if (value.trim()) {

            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));

        }
    };


    // Validate experience form
    const validateExperience = () => {

        const newErrors = {
            jobTitle: "",
            company: "",
            startDate: "",
            endDate: ""
        };

        let isValid = true;


        if (!experience.jobTitle.trim()) {

            newErrors.jobTitle =
                "Job title is required";

            isValid = false;

        }


        if (!experience.company.trim()) {

            newErrors.company =
                "Company is required";

            isValid = false;

        }


        if (!experience.startDate.trim()) {

            newErrors.startDate =
                "Start date is required";

            isValid = false;

        }


        if (!experience.endDate.trim()) {

            newErrors.endDate =
                "End date is required";

            isValid = false;

        }


        setErrors(newErrors);

        return isValid;
    };


    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();


        // Validate before submitting
        if (!validateExperience()) {
            return;
        }


        try {

            if (!resumeId || resumeId === "new") {

                alert("Resume ID is missing");

                return;
            }


            // UPDATE MODE
            if (editingExperienceId !== null) {

                const updatedExperience =
                    await updateExperience(
                        Number(resumeId),
                        editingExperienceId,
                        experience
                    );


                setExperiences(prev =>
                    prev.map(exp =>
                        exp.id === editingExperienceId
                            ? updatedExperience
                            : exp
                    )
                );


                alert(
                    "Experience updated successfully!"
                );


                // Clear form
                setExperience({
                    jobTitle: "",
                    company: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    description: ""
                });


                // Clear errors
                setErrors({
                    jobTitle: "",
                    company: "",
                    startDate: "",
                    endDate: ""
                });


                onChange?.();


                // Go back to Add mode
                setEditingExperienceId(null);

            }

            // CREATE MODE
            else {

                const savedExperience =
                    await createExperience(
                        Number(resumeId),
                        experience
                    );


                setExperiences([
                    ...experiences,
                    savedExperience
                ]);


                alert(
                    "Experience added successfully!"
                );


                // Clear form
                setExperience({
                    jobTitle: "",
                    company: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    description: ""
                });


                // Clear errors
                setErrors({
                    jobTitle: "",
                    company: "",
                    startDate: "",
                    endDate: ""
                });


                onChange?.();

            }

        } catch (error) {

            console.error(
                "Failed to save experience:",
                error
            );

        }
    };


    const handleEdit = (
        data: ExperienceResponse
    ) => {

        // Put existing data in form
        setExperience({
            jobTitle: data.jobTitle,
            company: data.company,
            location: data.location,
            startDate: data.startDate,
            endDate: data.endDate,
            description: data.description
        });


        // Clear old validation errors
        setErrors({
            jobTitle: "",
            company: "",
            startDate: "",
            endDate: ""
        });


        // Store which experience is being edited
        setEditingExperienceId(data.id);
    };


    const handleDelete = async (
        experienceId: number
    ) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this experience?"
            );

        if (!confirmDelete) {
            return;
        }


        try {

            if (
                !resumeId ||
                resumeId === "new"
            ) {

                alert("Resume ID is missing");

                return;
            }


            await deleteExperience(
                Number(resumeId),
                experienceId
            );


            setExperiences(prev =>
                prev.filter(
                    exp => exp.id !== experienceId
                )
            );


            // If deleted item was being edited
            if (
                editingExperienceId === experienceId
            ) {

                setEditingExperienceId(null);

                setExperience({
                    jobTitle: "",
                    company: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    description: ""
                });


                setErrors({
                    jobTitle: "",
                    company: "",
                    startDate: "",
                    endDate: ""
                });

            }


            onChange?.();


            alert(
                "Experience deleted successfully!"
            );

        } catch (error) {

            console.error(
                "Failed to delete experience:",
                error
            );

        }
    };


    // Cancel edit mode
    const handleCancelEdit = () => {

        setEditingExperienceId(null);

        setExperience({
            jobTitle: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            description: ""
        });


        setErrors({
            jobTitle: "",
            company: "",
            startDate: "",
            endDate: ""
        });

    };


    return (

        <div className="card p-4">

            <h4 className="mb-4">
                Experience
            </h4>


            <form onSubmit={handleSubmit}>

                {/* Job Title */}

                <div className="mb-3">

                    <label className="form-label">

                        Job Title{" "}

                        <span className="text-danger">
                            *
                        </span>

                    </label>


                    <input
                        type="text"
                        name="jobTitle"
                        className={`form-control ${
                            errors.jobTitle
                                ? "is-invalid"
                                : ""
                        }`}
                        value={experience.jobTitle}
                        onChange={handleChange}
                    />


                    {errors.jobTitle && (

                        <div className="invalid-feedback">

                            {errors.jobTitle}

                        </div>

                    )}

                </div>


                {/* Company */}

                <div className="mb-3">

                    <label className="form-label">

                        Company{" "}

                        <span className="text-danger">
                            *
                        </span>

                    </label>


                    <input
                        type="text"
                        name="company"
                        className={`form-control ${
                            errors.company
                                ? "is-invalid"
                                : ""
                        }`}
                        value={experience.company}
                        onChange={handleChange}
                    />


                    {errors.company && (

                        <div className="invalid-feedback">

                            {errors.company}

                        </div>

                    )}

                </div>


                {/* Location */}

                <div className="mb-3">

                    <label className="form-label">
                        Location
                    </label>


                    <input
                        type="text"
                        name="location"
                        className="form-control"
                        value={experience.location}
                        onChange={handleChange}
                    />

                </div>


                {/* Dates */}

                <div className="row">

                    {/* Start Date */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Start Date{" "}

                            <span className="text-danger">
                                *
                            </span>

                        </label>


                        <input
                            type="text"
                            name="startDate"
                            className={`form-control ${
                                errors.startDate
                                    ? "is-invalid"
                                    : ""
                            }`}
                            value={experience.startDate}
                            onChange={handleChange}
                        />


                        {errors.startDate && (

                            <div className="invalid-feedback">

                                {errors.startDate}

                            </div>

                        )}

                    </div>


                    {/* End Date */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            End Date{" "}

                            <span className="text-danger">
                                *
                            </span>

                        </label>


                        <input
                            type="text"
                            name="endDate"
                            className={`form-control ${
                                errors.endDate
                                    ? "is-invalid"
                                    : ""
                            }`}
                            value={experience.endDate}
                            onChange={handleChange}
                        />


                        {errors.endDate && (

                            <div className="invalid-feedback">

                                {errors.endDate}

                            </div>

                        )}

                    </div>

                </div>


                {/* Description */}

                <div className="mb-3">

                    <label className="form-label">
                        Description
                    </label>


                    <textarea
                        name="description"
                        className="form-control"
                        rows={4}
                        placeholder="Describe your work and responsibilities"
                        value={experience.description}
                        onChange={handleChange}
                    />

                </div>


                {/* Submit Button */}

                <button
                    type="submit"
                    className="btn btn-primary"
                >

                    {editingExperienceId !== null
                        ? "Update Experience"
                        : "Add Experience"
                    }

                </button>


                {/* Cancel Button */}

                {editingExperienceId !== null && (

                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={handleCancelEdit}
                    >

                        Cancel

                    </button>

                )}

            </form>


            {/* Saved Experience */}

            <div className="mt-4">

                <h5 className="mb-3">
                    Saved Experience
                </h5>


                {experiences.length === 0 ? (

                    <p className="text-muted">
                        No experience added yet.
                    </p>

                ) : (

                    experiences.map((item) => (

                        <div
                            key={item.id}
                            className="border rounded p-3 mb-3"
                        >

                            <h6 className="mb-1">
                                {item.jobTitle}
                            </h6>


                            <div>
                                {item.company}
                            </div>


                            <div className="text-muted">
                                {item.location}
                            </div>


                            <small className="text-muted">
                                {item.startDate} - {item.endDate}
                            </small>


                            <p className="mt-2 mb-0">
                                {item.description}
                            </p>


                            {/* Actions */}

                            <div className="mt-3">

                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary me-2"
                                    onClick={() =>
                                        handleEdit(item)
                                    }
                                >

                                    <i className="bi bi-pencil"></i>

                                    {" "}Edit

                                </button>


                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() =>
                                        handleDelete(item.id)
                                    }
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

export default Experience;