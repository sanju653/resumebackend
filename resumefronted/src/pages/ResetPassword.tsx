import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/authService";

function ResetPassword() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();//reads query parameters from the URL.

    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: "",
        token: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);//Controls the button while the backend request is running.

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        const newErrors = {
            password: "",
            confirmPassword: "",
            token: ""
        };

        let isValid = true;

        if (!token) {
            newErrors.token = "Invalid or missing reset token";
            isValid = false;
        }

        if (!newPassword.trim()) {

            newErrors.password = "New password is required";
            isValid = false;

        } else if (newPassword.length < 6) {

            newErrors.password =
                "Password must be at least 6 characters";

            isValid = false;
        }

        if (!confirmPassword.trim()) {

            newErrors.confirmPassword =
                "Please confirm your password";

            isValid = false;

        } else if (newPassword !== confirmPassword) {

            newErrors.confirmPassword =
                "Passwords do not match";

            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            return;//if validation fails, the backend should not be called.
        }

        try {

            setLoading(true);//API request is currently running.
            setMessage("");//clears an old success message.

            await resetPassword({
                token: token!,//The ! is TypeScript's non-null assertion operator.Earlier you checked:if (!token) {....return }Therefore, you tell TypeScript:At this point, trust me that token is not null.


                newPassword
            });

            setMessage(
                "Password reset successfully. Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error: any) {

           

            setErrors(prev => ({
                ...prev,
                token:
                    error.response?.data ||
                    "Invalid or expired reset token"
            }));

        } finally {

            setLoading(false);//This makes the button usable again.

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

                    <h1>Reset password</h1>

                    <p>
                        Create a new password for your account.
                    </p>

                </div>

                {/* Invalid Token */}
                {errors.token && (
                    <div className="alert alert-danger">
                        {errors.token}
                    </div>
                )}

                {/* Success Message */}
                {message && (
                    <div className="alert alert-success">
                        {message}
                    </div>
                )}

                {/* Form */}
                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {/* New Password */}
                    <div className="auth-form-group">

                        <label>
                            New Password{" "}
                            <span className="text-danger">
                                *
                            </span>
                        </label>

                        <div className="password-input-wrapper">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter new password"
                                value={newPassword}
                                className={
                                    errors.password
                                        ? "is-invalid"
                                        : ""
                                }
                                onChange={(e) => {

                                    setNewPassword(
                                        e.target.value
                                    );

                                    setErrors(prev => ({
                                        ...prev,
                                        password: ""
                                    }));

                                }}
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
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
                            <span className="text-danger">
                                *
                            </span>
                        </label>

                        <div className="password-input-wrapper">

                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm new password"
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

                                    setErrors(prev => ({
                                        ...prev,
                                        confirmPassword: ""
                                    }));

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

                    {/* Reset Button */}
                    <button
                        type="submit"
                        className="auth-primary-btn"
                        disabled={loading}//means while the API is running, the user can't click the button again.
                    >
                        {loading
                            ? "Resetting..."
                            : "Reset Password"}
                    </button>

                </form>

                {/* Back to Login */}
                <div className="auth-footer">

                    <span>
                        Remember your password?
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Back to login
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ResetPassword;