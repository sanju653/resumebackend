import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    addSocialLink,
    getSocialLinks,
    updateSocialLink,
    deleteSocialLink,
    type SocialLinkRequest,
    type SocialLinkResponse
} from "../services/socialLinkService";

interface SocialLinkProps {
    onChange?: () => void;
}

function SocialLink({ onChange }: SocialLinkProps) {

    const [socialLink, setSocialLink] =
        useState<SocialLinkRequest>({
            platform: "",
            url: ""
        });

    const [socialLinks, setSocialLinks] =
        useState<SocialLinkResponse[]>([]);

    const [socialLinkEditingId, setSocialLinkEditingId] =
        useState<number | null>(null);

    const [errors, setErrors] = useState({
        platform: "",
        url: ""
    });

    const { resumeId } = useParams<{ resumeId: string }>();


    // Load saved social links

    useEffect(() => {

        if (!resumeId || resumeId === "new") {
            return;
        }

        const loadSocialLinks = async () => {

            try {

                const data =
                    await getSocialLinks(Number(resumeId));

                setSocialLinks(data);

            } catch (error) {

                console.error(
                    "Failed to load social links:",
                    error
                );

            }

        };

        loadSocialLinks();

    }, [resumeId]);


    // Handle input changes

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setSocialLink({
            ...socialLink,
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

    const validateSocialLink = () => {

        const newErrors = {
            platform: "",
            url: ""
        };

        let isValid = true;


        if (!socialLink.platform.trim()) {

            newErrors.platform = "Platform is required";

            isValid = false;

        }


        if (!socialLink.url.trim()) {

            newErrors.url = "URL is required";

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

        if (!validateSocialLink()) {
            return;
        }

        if (!resumeId || resumeId === "new") {

            alert("Resume id is missing");

            return;

        }

        try {

            if (socialLinkEditingId !== null) {

                const updatedSocialLink =
                    await updateSocialLink(
                        Number(resumeId),
                        socialLinkEditingId,
                        socialLink
                    );

                setSocialLinks(prev =>
                    prev.map(item =>
                        item.id === socialLinkEditingId
                            ? updatedSocialLink
                            : item
                    )
                );

                setSocialLinkEditingId(null);

                setSocialLink({
                    platform: "",
                    url: ""
                });

                setErrors({
                    platform: "",
                    url: ""
                });

                onChange?.();

                alert("Social link updated successfully!");

            } else {

                const savedSocialLink =
                    await addSocialLink(
                        Number(resumeId),
                        socialLink
                    );

                setSocialLinks(prev => [
                    ...prev,
                    savedSocialLink
                ]);

                setSocialLink({
                    platform: "",
                    url: ""
                });

                setErrors({
                    platform: "",
                    url: ""
                });

                onChange?.();

                alert("Social link added successfully!");

            }

        } catch (error) {

            console.error(
                "Failed to save social link:",
                error
            );

        }

    };


    // Delete

    const handleDelete = async (id: number) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this social link?"
            );

        if (!confirmDelete) return;

        if (!resumeId || resumeId === "new") {

            alert("Resume id is missing");

            return;

        }

        try {

            await deleteSocialLink(
                Number(resumeId),
                id
            );

            setSocialLinks(prev =>
                prev.filter(item => item.id !== id)
            );

            if (socialLinkEditingId === id) {

                setSocialLinkEditingId(null);

                setSocialLink({
                    platform: "",
                    url: ""
                });

                setErrors({
                    platform: "",
                    url: ""
                });

            }

            onChange?.();

            alert("Social link deleted successfully!");

        } catch (error) {

            console.error(
                "Failed to delete social link:",
                error
            );

        }

    };


    // Edit

    const handleEdit = (
        data: SocialLinkResponse
    ) => {

        setSocialLinkEditingId(data.id);

        setSocialLink({
            platform: data.platform,
            url: data.url
        });

        setErrors({
            platform: "",
            url: ""
        });

    };


    // Cancel edit

    const handleCancelEdit = () => {

        setSocialLinkEditingId(null);

        setSocialLink({
            platform: "",
            url: ""
        });

        setErrors({
            platform: "",
            url: ""
        });

    };


    return (
        <div className="card p-4">

            <h4 className="mb-4">
                Social Links
            </h4>


            <form onSubmit={handleSubmit}>

                {/* Platform */}

                <div className="mb-3">

                    <label className="form-label">
                        Platform{" "}
                        <span className="text-danger">*</span>
                    </label>

                    <input
                        type="text"
                        name="platform"
                        className={`form-control ${
                            errors.platform ? "is-invalid" : ""
                        }`}
                        value={socialLink.platform}
                        onChange={handleChange}
                    />

                    {errors.platform && (
                        <div className="invalid-feedback">
                            {errors.platform}
                        </div>
                    )}

                </div>


                {/* URL */}

                <div className="mb-3">

                    <label className="form-label">
                        URL{" "}
                        <span className="text-danger">*</span>
                    </label>

                    <input
                        type="url"
                        name="url"
                        className={`form-control ${
                            errors.url ? "is-invalid" : ""
                        }`}
                        value={socialLink.url}
                        onChange={handleChange}
                    />

                    {errors.url && (
                        <div className="invalid-feedback">
                            {errors.url}
                        </div>
                    )}

                </div>


                {/* Buttons */}

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {socialLinkEditingId !== null
                        ? "Update"
                        : "Add"}
                </button>


                {socialLinkEditingId !== null && (

                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={handleCancelEdit}
                    >
                        Cancel
                    </button>

                )}

            </form>


            {/* Saved Social Links */}

            <div className="mt-4">

                <h5 className="mb-3">
                    Saved Social Links
                </h5>


                {socialLinks.length === 0 ? (

                    <p className="text-muted">
                        No social links added yet.
                    </p>

                ) : (

                    socialLinks.map((item) => (

                        <div
                            key={item.id}
                            className="border rounded p-3 mb-3"
                        >

                            <h6 className="mb-1">
                                {item.platform}
                            </h6>

                            <div className="mt-1">

                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.url}
                                </a>

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

export default SocialLink;