import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setError("");
        setMessage("");

        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Enter a valid email address");
            return;
        }

        try {

            setLoading(true);

            const token = await forgotPassword(email);

           

           setMessage(
    "Password reset link has been sent to your email."
);

        } catch (error: any) {

            console.log(error);

            if (error.response?.status === 400) {

                setError(
                    error.response?.data ||
                    "User not found"
                );

            } else {

                setError(
                    "Something went wrong. Please try again."
                );

            }

        } finally {

            setLoading(false);

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

                    <h1>Forgot password?</h1>

                    <p>
                        Enter your email and we'll help you
                        reset your password.
                    </p>

                </div>

                {/* Form */}
                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {/* Email */}
                    <div className="auth-form-group">

                        <label>
                            Email{" "}
                            <span className="text-danger">
                                *
                            </span>
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            className={
                                error
                                    ? "is-invalid"
                                    : ""
                            }
                            onChange={(e) => {

                                setEmail(e.target.value);

                                setError("");
                                setMessage("");

                            }}
                        />

                        {error && (
                            <div className="invalid-feedback">
                                {error}
                            </div>
                        )}

                    </div>

                    {/* Success Message */}
                    {message && (
                        <div className="alert alert-success">
                            {message}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="auth-primary-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Sending..."
                            : "Send Reset Link"}
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

export default ForgotPassword;