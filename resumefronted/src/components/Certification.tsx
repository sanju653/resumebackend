import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    addCertification,
    getCertifications,
    updateCertification,
    deleteCertification,
    type CertificationRequest,
    type CertificationResponse
} from "../services/certificationService";

interface CertificationProps {
    onChange?: () => void;
}

function Certification({ onChange }: CertificationProps) {

    const [certification, setCertification] =
        useState<CertificationRequest>({
            name: "",
            issuingOrganization: "",
            issueDate: "",
            credentialUrl: ""
        });

    const [certifications, setCertifications] =
        useState<CertificationResponse[]>([]);

    const [certificationEditingId, setCertificationEditingId] =
        useState<number | null>(null);

    const [errors, setErrors] = useState({
        name: "",
        issuingOrganization: "",
        issueDate: ""
    });

    const { resumeId } = useParams<{ resumeId: string }>();


    // Load saved certifications
    useEffect(() => {

        if (!resumeId || resumeId === "new") {
            return;
        }

        const loadCertifications = async () => {

            try {

                const data = await getCertifications(Number(resumeId));

                setCertifications(data);

            } catch (error) {

                console.error(
                    "Failed to load certifications:",
                    error
                );

            }

        };

        loadCertifications();

    }, [resumeId]);


    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setCertification({
            ...certification,
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
    const validateCertification = () => {

        const newErrors = {
            name: "",
            issuingOrganization: "",
            issueDate: ""
        };

        let isValid = true;


        if (!certification.name.trim()) {

            newErrors.name = "Certification name is required";

            isValid = false;

        }


        if (!certification.issuingOrganization.trim()) {

            newErrors.issuingOrganization =
                "Issuing organization is required";

            isValid = false;

        }


        if (!certification.issueDate.trim()) {

            newErrors.issueDate = "Issue date is required";

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

        if (!validateCertification()) {
            return;
        }

        if (!resumeId || resumeId === "new") {

            alert("Resume id is missing");

            return;

        }

        try {

            if (certificationEditingId !== null) {

                const updatedCertification =
                    await updateCertification(
                        Number(resumeId),
                        certificationEditingId,
                        certification
                    );

                setCertifications(prev =>
                    prev.map(cert =>
                        cert.id === certificationEditingId
                            ? updatedCertification
                            : cert
                    )
                );

                setCertificationEditingId(null);

                setCertification({
                    name: "",
                    issuingOrganization: "",
                    issueDate: "",
                    credentialUrl: ""
                });

                setErrors({
                    name: "",
                    issuingOrganization: "",
                    issueDate: ""
                });

                onChange?.();

                alert("Certification updated successfully!");

            } else {

                const savedCertification =
                    await addCertification(
                        Number(resumeId),
                        certification
                    );

                setCertifications(prev => [
                    ...prev,
                    savedCertification
                ]);

                setCertification({
                    name: "",
                    issuingOrganization: "",
                    issueDate: "",
                    credentialUrl: ""
                });

                setErrors({
                    name: "",
                    issuingOrganization: "",
                    issueDate: ""
                });

                onChange?.();

                alert("Certification added successfully!");

            }

        } catch (error) {

            console.error(
                "Failed to save certification:",
                error
            );

        }

    };


    // Delete
    const handleDelete = async (id: number) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this certification?"
            );

        if (!confirmDelete) {
            return;
        }

        if (!resumeId || resumeId === "new") {

            alert("Resume id is missing");

            return;

        }

        try {

            await deleteCertification(
                Number(resumeId),
                id
            );

            setCertifications(prev =>
                prev.filter(cert => cert.id !== id)
            );

            if (certificationEditingId === id) {

                setCertificationEditingId(null);

                setCertification({
                    name: "",
                    issuingOrganization: "",
                    issueDate: "",
                    credentialUrl: ""
                });

                setErrors({
                    name: "",
                    issuingOrganization: "",
                    issueDate: ""
                });

            }

            onChange?.();

            alert("Certification deleted successfully!");

        } catch (error) {

            console.error(
                "Failed to delete certification:",
                error
            );

        }

    };


    // Edit
    const handleEdit = (
        data: CertificationResponse
    ) => {

        setCertificationEditingId(data.id);

        setCertification({
            name: data.name,
            issuingOrganization: data.issuingOrganization,
            issueDate: data.issueDate,
            credentialUrl: data.credentialUrl
        });

        setErrors({
            name: "",
            issuingOrganization: "",
            issueDate: ""
        });

    };


    // Cancel edit
    const handleCancelEdit = () => {

        setCertificationEditingId(null);

        setCertification({
            name: "",
            issuingOrganization: "",
            issueDate: "",
            credentialUrl: ""
        });

        setErrors({
            name: "",
            issuingOrganization: "",
            issueDate: ""
        });

    };


    return (

        <div className="card p-4">

            <h4 className="mb-4">
                Certifications
            </h4>


            <form onSubmit={handleSubmit}>

                {/* Certification Name */}

                <div className="mb-3">

                    <label className="form-label">
                        Certification Name{" "}
                        <span className="text-danger">*</span>
                    </label>

                    <input
                        type="text"
                        name="name"
                        className={`form-control ${
                            errors.name ? "is-invalid" : ""
                        }`}
                        value={certification.name}
                        onChange={handleChange}
                    />

                    {errors.name && (
                        <div className="invalid-feedback">
                            {errors.name}
                        </div>
                    )}

                </div>


                {/* Issuing Organization */}

                <div className="mb-3">

                    <label className="form-label">
                        Issuing Organization{" "}
                        <span className="text-danger">*</span>
                    </label>

                    <input
                        type="text"
                        name="issuingOrganization"
                        className={`form-control ${
                            errors.issuingOrganization
                                ? "is-invalid"
                                : ""
                        }`}
                        value={certification.issuingOrganization}
                        onChange={handleChange}
                    />

                    {errors.issuingOrganization && (
                        <div className="invalid-feedback">
                            {errors.issuingOrganization}
                        </div>
                    )}

                </div>


                {/* Issue Date */}

                <div className="mb-3">

                    <label className="form-label">
                        Issue Date{" "}
                        <span className="text-danger">*</span>
                    </label>

                    <input
                        type="date"
                        name="issueDate"
                        className={`form-control ${
                            errors.issueDate ? "is-invalid" : ""
                        }`}
                        value={certification.issueDate}
                        onChange={handleChange}
                    />

                    {errors.issueDate && (
                        <div className="invalid-feedback">
                            {errors.issueDate}
                        </div>
                    )}

                </div>


                {/* Credential URL */}

                <div className="mb-3">

                    <label className="form-label">
                        Credential URL
                    </label>

                    <input
                        type="url"
                        name="credentialUrl"
                        className="form-control"
                        value={certification.credentialUrl}
                        onChange={handleChange}
                    />

                </div>


                {/* Buttons */}

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {certificationEditingId !== null
                        ? "Update"
                        : "Add"}
                </button>


                {certificationEditingId !== null && (

                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={handleCancelEdit}
                    >
                        Cancel
                    </button>

                )}

            </form>


            {/* Saved Certifications */}

            <div className="mt-4">

                <h5 className="mb-3">
                    Saved Certifications
                </h5>


                {certifications.length === 0 ? (

                    <p className="text-muted">
                        No certifications added yet.
                    </p>

                ) : (

                    certifications.map((item) => (

                        <div
                            key={item.id}
                            className="border rounded p-3 mb-3"
                        >

                            <h6 className="mb-1">
                                {item.name}
                            </h6>

                            <div className="text-muted">
                                {item.issuingOrganization}
                            </div>

                            {item.issueDate && (
                                <div className="mt-1">
                                    Issue Date: {item.issueDate}
                                </div>
                            )}


                            {item.credentialUrl && (

                                <div className="mt-2">

                                    <a
                                        href={item.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="bi bi-box-arrow-up-right"></i>{" "}
                                        View Credential
                                    </a>

                                </div>

                            )}


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

export default Certification;