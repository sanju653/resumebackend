import { useState, useEffect } from "react";
import {
    addSkill,
    deleteSkill,
    getSkills,
    updateSkill,
    type SkillRequest,
    type SkillResponse
} from "../services/skillService";
import { useParams } from "react-router-dom";

interface SkillProps {
    onChange?: () => void;
}

function Skill({ onChange }: SkillProps) {

    const [skill, setSkill] = useState<SkillRequest>({
        name: "",
        category: ""
    });

    const [skills, setSkills] = useState<SkillResponse[]>([]);

    const [skillEditingId, setSkillEditingId] =
        useState<number | null>(null);

    const [errors, setErrors] = useState({
        name: ""
    });

    const { resumeId } = useParams<{ resumeId: string }>();


    // Load saved skills

    useEffect(() => {

        if (!resumeId || resumeId === "new") {
            return;
        }

        const loadSkills = async () => {

            try {

                const data = await getSkills(Number(resumeId));

                setSkills(data);

            } catch (error) {

                console.error(
                    "Failed to load skills:",
                    error
                );

            }

        };

        loadSkills();

    }, [resumeId]);


    // Handle input changes

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setSkill({
            ...skill,
            [name]: value
        });

        if (value.trim()) {

            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));

        }

    };


    // Validation

    const validateSkill = () => {

        const newErrors = {
            name: ""
        };

        let isValid = true;


        if (!skill.name.trim()) {

            newErrors.name = "Skill is required";

            isValid = false;

        }


        setErrors(newErrors);

        return isValid;

    };


    // Add / Update

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (!validateSkill()) {
            return;
        }

        if (!resumeId || resumeId === "new") {

            alert("Resume id is missing");

            return;

        }

        try {

            if (skillEditingId !== null) {

                const updatedSkill =
                    await updateSkill(
                        Number(resumeId),
                        skillEditingId,
                        skill
                    );

                setSkills(prev =>
                    prev.map(sk =>
                        sk.id === skillEditingId
                            ? updatedSkill
                            : sk
                    )
                );

                setSkillEditingId(null);

                setSkill({
                    name: "",
                    category: ""
                });

                setErrors({
                    name: ""
                });

                onChange?.();

                alert("Skill updated successfully!");

            } else {

                const savedSkill =
                    await addSkill(
                        Number(resumeId),
                        skill
                    );

                setSkills(prev => [
                    ...prev,
                    savedSkill
                ]);

                setSkill({
                    name: "",
                    category: ""
                });

                setErrors({
                    name: ""
                });

                onChange?.();

                alert("Skill added successfully!");

            }

        } catch (error) {

            console.error(
                "Failed to save skill:",
                error
            );

        }

    };


    // Delete

    const handleDelete = async (id: number) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this skill?"
        );

        if (!confirmDelete) {
            return;
        }

        if (!resumeId || resumeId === "new") {

            alert("Resume id is missing");

            return;

        }

        try {

            await deleteSkill(
                Number(resumeId),
                id
            );

            setSkills(prev =>
                prev.filter(sk => sk.id !== id)
            );


            if (skillEditingId === id) {

                setSkillEditingId(null);

                setSkill({
                    name: "",
                    category: ""
                });

                setErrors({
                    name: ""
                });

            }

            onChange?.();

            alert("Skill deleted successfully!");

        } catch (error) {

            console.error(
                "Failed to delete skill:",
                error
            );

        }

    };


    // Cancel edit

    const handleCancelEdit = () => {

        setSkillEditingId(null);

        setSkill({
            name: "",
            category: ""
        });

        setErrors({
            name: ""
        });

    };


    // Edit

    const handleEdit = (
        data: SkillResponse
    ) => {

        setSkillEditingId(data.id);

        setSkill({
            name: data.name,
            category: data.category
        });

        setErrors({
            name: ""
        });

    };


    return (

        <div className="card p-4">

            <h4 className="mb-4">
                Skills
            </h4>


            <form onSubmit={handleSubmit}>

                {/* Skill Name */}

                <div className="mb-3">

                    <label className="form-label">
                        Skill{" "}
                        <span className="text-danger">*</span>
                    </label>

                    <input
                        type="text"
                        name="name"
                        className={`form-control ${
                            errors.name ? "is-invalid" : ""
                        }`}
                        value={skill.name}
                        onChange={handleChange}
                    />

                    {errors.name && (
                        <div className="invalid-feedback">
                            {errors.name}
                        </div>
                    )}

                </div>


                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {skillEditingId !== null
                        ? "Update"
                        : "Add"}
                </button>


                {/* Cancel Button */}

                {skillEditingId !== null && (

                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={handleCancelEdit}
                    >
                        Cancel
                    </button>

                )}

            </form>


            {/* Saved Skills */}

            <div className="mt-4">

                <h5 className="mb-3">
                    Saved Skills
                </h5>


                {skills.length === 0 ? (

                    <p className="text-muted">
                        No skills added yet.
                    </p>

                ) : (

                    skills.map((item) => (

                        <div
                            key={item.id}
                            className="border rounded p-3 mb-3"
                        >

                            <h6 className="mb-1">
                                {item.name}
                            </h6>

                            <div className="text-muted">
                                {item.category}
                            </div>


                            <div className="mt-3">

                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary me-2"
                                    onClick={() => handleEdit(item)}
                                >
                                    <i className="bi bi-pencil"></i>{" "}
                                    Edit
                                </button>


                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <i className="bi bi-trash"></i>{" "}
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default Skill;