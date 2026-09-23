import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    createEducation,
    getMyEducation,
    updateEducation,
    deleteEducation,
    type EducationRequest,
    type EducationResponse
} from "../services/educationService";

// Education component can receive an optional onChange function from its parent
interface EducationProps {
    onChange?: () => void;
}

function Education({ onChange }: EducationProps) {

    const [education, setEducation] = useState<EducationRequest>({
        degree: "",
        institution: "",
        location: "",
        startYear: "",
        endYear: ""
    });

    const { resumeId } = useParams<{ resumeId: string }>();

    // Store all saved education records
    const [educations, setEducations] = useState<EducationResponse[]>([]);

    // Store the id of education currently being edited
    const [editingEducationId, setEditingEducationId] =
        useState<number | null>(null);

    // Store validation errors
    const [errors, setErrors] = useState({
        degree: "",
        institution: "",
        startYear: "",
        endYear: ""
    });


    useEffect(() => {

        if (!resumeId || resumeId === "new") {
            return;
        }

        const loadEducation = async () => {

            try {

                const data = await getMyEducation(Number(resumeId));

                setEducations(data);

            } catch (error) {

                console.error(
                    "Failed to load education:",
                    error
                );

            }
        };

        loadEducation();

    }, [resumeId]);


    // Take what the user types and store it in React state
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setEducation({
            ...education,
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


    // Validate education form
    const validateEducation = () => {

        const newErrors = {
            degree: "",
            institution: "",
            startYear: "",
            endYear: ""
        };

        let isValid = true;


        if (!education.degree.trim()) {

            newErrors.degree = "Degree is required";

            isValid = false;

        }


        if (!education.institution.trim()) {

            newErrors.institution =
                "Institution is required";

            isValid = false;

        }


        if (!education.startYear.trim()) {

            newErrors.startYear =
                "Start year is required";

            isValid = false;

        }


        if (!education.endYear.trim()) {

            newErrors.endYear =
                "End year is required";

            isValid = false;

        }


        setErrors(newErrors);

        return isValid;
    };


    // Take the complete data stored in state and send it to backend
    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();


        // Validate form before submitting
        if (!validateEducation()) {
            return;
        }


        try {

            if (!resumeId || resumeId === "new") {

                alert("Resume ID is missing");

                return;
            }


            // UPDATE
            if (editingEducationId !== null) {

                const updatedEducation =
                    await updateEducation(
                        Number(resumeId),
                        editingEducationId,
                        education
                    );


                // Update the item in React state
                setEducations(prev =>
                    prev.map(edu =>
                        edu.id === editingEducationId
                            ? updatedEducation
                            : edu
                    )
                );


                alert("Education updated successfully!");


                // Clear form
                setEducation({
                    degree: "",
                    institution: "",
                    location: "",
                    startYear: "",
                    endYear: ""
                });


                // Clear errors
                setErrors({
                    degree: "",
                    institution: "",
                    startYear: "",
                    endYear: ""
                });


                onChange?.();


                // Go back to Add mode
                setEditingEducationId(null);

            }

            // CREATE
            else {

                const savedEducation =
                    await createEducation(
                        Number(resumeId),
                        education
                    );


                setEducations([
                    ...educations,
                    savedEducation
                ]);


                alert("Education added successfully!");


                // Clear form
                setEducation({
                    degree: "",
                    institution: "",
                    location: "",
                    startYear: "",
                    endYear: ""
                });


                // Clear errors
                setErrors({
                    degree: "",
                    institution: "",
                    startYear: "",
                    endYear: ""
                });


                onChange?.();
            }

        } catch (error) {

            console.error(
                "Failed to add education:",
                error
            );

        }
    };


    const handleEdit = async (
        data: EducationResponse
    ) => {

        // Put existing data in form
        setEducation({
            degree: data.degree,
            institution: data.institution,
            location: data.location,
            startYear: data.startYear,
            endYear: data.endYear
        });


        // Clear old validation errors
        setErrors({
            degree: "",
            institution: "",
            startYear: "",
            endYear: ""
        });


        // Store which education is being edited
        setEditingEducationId(data.id);
    };


    const handleDelete = async (
        educationId: number
    ) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this education?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            if (!resumeId || resumeId === "new") {

                alert("Resume ID is missing");

                return;
            }


            await deleteEducation(
                Number(resumeId),
                educationId
            );


            setEducations(prev =>
                prev.filter(
                    edu => edu.id !== educationId
                )
            );


            // If deleted item was being edited
            if (editingEducationId === educationId) {

                setEditingEducationId(null);

                setEducation({
                    degree: "",
                    institution: "",
                    location: "",
                    startYear: "",
                    endYear: ""
                });


                setErrors({
                    degree: "",
                    institution: "",
                    startYear: "",
                    endYear: ""
                });
            }


            onChange?.();


            alert("Education deleted successfully!");

        } catch (error) {

            console.error(
                "Failed to delete education:",
                error
            );

        }
    };


    const handleCancelEdit = () => {

        setEditingEducationId(null);

        setEducation({
            degree: "",
            institution: "",
            location: "",
            startYear: "",
            endYear: ""
        });


        setErrors({
            degree: "",
            institution: "",
            startYear: "",
            endYear: ""
        });
    };


    return (

        <div className="card p-4">

            <h4 className="mb-4">
                Education
            </h4>


            <form onSubmit={handleSubmit}>


                {/* DEGREE */}

                <div className="mb-3">

                    <label className="form-label">

                        Degree{" "}

                        <span className="text-danger">
                            *
                        </span>

                    </label>


                    <input
                        type="text"
                        name="degree"
                        className={`form-control ${
                            errors.degree
                                ? "is-invalid"
                                : ""
                        }`}
                        value={education.degree}
                        onChange={handleChange}
                    />


                    {errors.degree && (

                        <div className="invalid-feedback">

                            {errors.degree}

                        </div>

                    )}

                </div>


                {/* INSTITUTION */}

                <div className="mb-3">

                    <label className="form-label">

                        Institution{" "}

                        <span className="text-danger">
                            *
                        </span>

                    </label>


                    <input
                        type="text"
                        name="institution"
                        className={`form-control ${
                            errors.institution
                                ? "is-invalid"
                                : ""
                        }`}
                        value={education.institution}
                        onChange={handleChange}
                    />


                    {errors.institution && (

                        <div className="invalid-feedback">

                            {errors.institution}

                        </div>

                    )}

                </div>


                {/* LOCATION */}

                <div className="mb-3">

                    <label className="form-label">
                        Location
                    </label>


                    <input
                        type="text"
                        name="location"
                        className="form-control"
                        value={education.location}
                        onChange={handleChange}
                    />

                </div>


                {/* YEARS */}

                <div className="row">


                    {/* START YEAR */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Start Year{" "}

                            <span className="text-danger">
                                *
                            </span>

                        </label>


                        <input
                            type="text"
                            name="startYear"
                            className={`form-control ${
                                errors.startYear
                                    ? "is-invalid"
                                    : ""
                            }`}
                            value={education.startYear}
                            onChange={handleChange}
                        />


                        {errors.startYear && (

                            <div className="invalid-feedback">

                                {errors.startYear}

                            </div>

                        )}

                    </div>


                    {/* END YEAR */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            End Year{" "}

                            <span className="text-danger">
                                *
                            </span>

                        </label>


                        <input
                            type="text"
                            name="endYear"
                            className={`form-control ${
                                errors.endYear
                                    ? "is-invalid"
                                    : ""
                            }`}
                            value={education.endYear}
                            onChange={handleChange}
                        />


                        {errors.endYear && (

                            <div className="invalid-feedback">

                                {errors.endYear}

                            </div>

                        )}

                    </div>

                </div>


                {/* BUTTON */}

                <button
                    type="submit"
                    className="btn btn-primary"
                >

                    {editingEducationId !== null
                        ? "Update Education"
                        : "Add Education"
                    }

                </button>


                {/* CANCEL */}

                {editingEducationId !== null && (

                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={handleCancelEdit}
                    >

                        Cancel

                    </button>

                )}

            </form>


            {/* SAVED EDUCATION */}

            <div className="mt-4">

                <h5 className="mb-3">
                    Saved Education
                </h5>


                {educations.length === 0 ? (

                    <p className="text-muted">
                        No education added yet.
                    </p>

                ) : (

                    educations.map((item) => (

                        <div
                            key={item.id}
                            className="border rounded p-3 mb-3"
                        >

                            <h6 className="mb-1">
                                {item.degree}
                            </h6>


                            <div>
                                {item.institution}
                            </div>


                            <div className="text-muted">
                                {item.location}
                            </div>


                            <small className="text-muted">
                                {item.startYear} - {item.endYear}
                            </small>


                            {/* ACTIONS */}

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

export default Education;