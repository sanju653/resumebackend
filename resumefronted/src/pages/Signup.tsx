import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService";

function Signup() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const validateSignup = () => {

        const newErrors = {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        };

        let isValid = true;

        // Name validation
        if (!name.trim()) {

            newErrors.name = "Full name is required";
            isValid = false;

        }

        // Email validation
        if (!email.trim()) {

            newErrors.email = "Email is required";
            isValid = false;

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {

            newErrors.email = "Enter a valid email address";
            isValid = false;

        }

        // Password validation
        if (!password.trim()) {

            newErrors.password = "Password is required";
            isValid = false;

        } else if (password.length < 6) {

            newErrors.password =
                "Password must be at least 6 characters";
            isValid = false;

        }

        // Confirm password validation
        if (!confirmPassword.trim()) {

            newErrors.confirmPassword =
                "Please confirm your password";
            isValid = false;

        } else if (password !== confirmPassword) {

            newErrors.confirmPassword =
                "Passwords do not match";
            isValid = false;

        }

        setErrors(newErrors);

        return isValid;
    };


    const handleSignup = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        // Stop if frontend validation fails
        if (!validateSignup()) {
            return;
        }

        try {

            const data = await signup({
                name,
                email,
                password,
                confirmPassword
            });

           

            navigate("/login");

        } catch (error: any) {

            console.error("Signup error:", error);

            if (error.response?.status === 400) {

                setErrors(prev => ({
                    ...prev,
                    email: "Email is already registered"
                }));

            } else {

                setErrors(prev => ({
                    ...prev,
                    email: "Something went wrong. Please try again."
                }));

            }
        }
    };


    return (
        <div className="auth-page">

            <div className="auth-card">

                {/* Logo */}
                <div className="auth-logo">
                    RESUMATE
                </div>


                {/* Heading */}
                <div className="auth-header">
                    <h1>Create your account</h1>
                    <p>
                        Start building a professional resume with RESUMATE.
                    </p>
                </div>


                {/* Signup Form */}
                <form
                    className="auth-form"
                    onSubmit={handleSignup}
                >

                    {/* Name */}
                    <div className="auth-form-group">

                        <label>
                            Full Name{" "}
                            <span className="text-danger">*</span>
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            className={
                                errors.name
                                    ? "is-invalid"
                                    : ""
                            }
                            onChange={(e) => {

                                setName(e.target.value);

                                if (e.target.value.trim()) {

                                    setErrors(prev => ({
                                        ...prev,
                                        name: ""
                                    }));

                                }

                            }}
                        />

                        {errors.name && (
                            <div className="invalid-feedback">
                                {errors.name}
                            </div>
                        )}

                    </div>


                    {/* Email */}
                    <div className="auth-form-group">

                        <label>
                            Email{" "}
                            <span className="text-danger">*</span>
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            className={
                                errors.email
                                    ? "is-invalid"
                                    : ""
                            }
                            onChange={(e) => {

                                setEmail(e.target.value);

                                if (e.target.value.trim()) {

                                    setErrors(prev => ({
                                        ...prev,
                                        email: ""
                                    }));

                                }

                            }}
                        />

                        {errors.email && (
                            <div className="invalid-feedback">
                                {errors.email}
                            </div>
                        )}

                    </div>


                    {/* Password */}
                    <div className="auth-form-group">

                        <label>
                            Password{" "}
                            <span className="text-danger">*</span>
                        </label>

                        <div className="password-input-wrapper">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Create a password"
                                value={password}
                                className={
                                    errors.password
                                        ? "is-invalid"
                                        : ""
                                }
                                onChange={(e) => {

                                    setPassword(e.target.value);

                                    if (e.target.value.trim()) {

                                        setErrors(prev => ({
                                            ...prev,
                                            password: ""
                                        }));

                                    }

                                }}
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                <i
                                    className={
                                        showPassword
                                            ? "bi bi-eye-slash"
                                            : "bi bi-eye"
                                    }
                                ></i>
                            </button>

                        </div>

                        {errors.password && (
                            <div className="invalid-feedback d-block">
                                {errors.password}
                            </div>
                        )}

                    </div>


                    {/* Confirm Password */}
                    <div className="auth-form-group">

                        <label>
                            Confirm Password{" "}
                            <span className="text-danger">*</span>
                        </label>

                        <div className="password-input-wrapper">

                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                className={
                                    errors.confirmPassword
                                        ? "is-invalid"
                                        : ""
                                }
                                onChange={(e) => {

                                    setConfirmPassword(
                                        e.target.value
                                    );

                                    if (e.target.value.trim()) {

                                        setErrors(prev => ({
                                            ...prev,
                                            confirmPassword: ""
                                        }));

                                    }

                                }}
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >
                                <i
                                    className={
                                        showConfirmPassword
                                            ? "bi bi-eye-slash"
                                            : "bi bi-eye"
                                    }
                                ></i>
                            </button>

                        </div>

                        {errors.confirmPassword && (
                            <div className="invalid-feedback d-block">
                                {errors.confirmPassword}
                            </div>
                        )}

                    </div>


                    {/* Create Account */}
                    <button
                        type="submit"
                        className="auth-primary-btn"
                    >
                        Create Account
                    </button>

                </form>


                {/* Divider */}
                <div className="auth-divider">
                    <span>OR</span>
                </div>


                {/* Social Signup */}
                <div className="social-login">

                    <button
                        type="button"
                        className="social-btn"
                    >
                        <i className="bi bi-google"></i>
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        className="social-btn"
                    >
                        <i className="bi bi-github"></i>
                        Continue with GitHub
                    </button>

                </div>


                {/* Login */}
                <div className="auth-footer">

                    <span>
                        Already have an account?
                    </span>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        Sign in
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Signup;