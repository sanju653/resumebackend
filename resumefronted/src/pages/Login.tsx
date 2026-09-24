import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import useAuthStore from "../store/authStore.ts";
//import "../styles/auth.css";

function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const loginUser = useAuthStore((state) => state.login);
    const [rememberMe, setRememberMe] = useState(false);

    const validateLogin = () => {

        const newErrors = {
            email: "",
            password: ""
        };

        let isValid = true;

        if (!email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            newErrors.email = "Enter a valid email address";
            isValid = false;
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    };

    const handleLogin = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        if (!validateLogin()) {
            return;
        }

        try {

            const data = await login({
                email,
                password
            });

          

            loginUser(
                data.accessToken,
                data.refreshToken,rememberMe
            );

            const from =
                location.state?.from?.pathname ||
                "/dashboard";

          

            navigate(from, {
                replace: true
            });

        } catch (error: any) {


            if (error.response?.status === 400) {

                setErrors(prev => ({
                    ...prev,
                    password: "Invalid email or password"
                }));

            } else {

                setErrors(prev => ({
                    ...prev,
                    password: "Something went wrong. Please try again."
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
                    <h1>Welcome back</h1>
                    <p>
                        Sign in to continue building your resume.
                    </p>
                </div>

                {/* Login Form */}
                <form
                    className="auth-form"
                    onSubmit={handleLogin}
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


                  <div className="auth-form-group">

    <label>
        Password{" "}
        <span className="text-danger">*</span>
    </label>

    <div className="password-input-wrapper">

        <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            className={errors.password ? "is-invalid" : ""}
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


                    {/* Options */}
                    <div className="auth-options">

                        <label className="remember-me">

                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e)=>setRememberMe(e.target.checked)}
                            />

                            <span>
                                Remember me
                            </span>

                        </label>

                        <button
                            type="button"
                            className="forgot-password"
                            onClick={()=>navigate("/forgot-password")}
                        >
                            Forgot password?
                        </button>

                    </div>


                    {/* Login Button */}
                    <button
                        type="submit"
                        className="auth-primary-btn"
                    >
                        Sign In
                    </button>

                </form>


                {/* Divider */}
                <div className="auth-divider">
                    <span>OR</span>
                </div>


                {/* Social Login */}
                <div className="social-login">

                    <button
                        type="button"
                        className="social-btn"

                            onClick={() => {
        window.location.href =
 "https://resumebackend-xvbd.onrender.com/oauth2/authorization/google";    }}

                    >
                        <i className="bi bi-google"></i>
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        className="social-btn"
                          onClick={() => {
        window.location.href =
      
    "https://resumebackend-xvbd.onrender.com/oauth2/authorization/github";
    }}

                    >
                        <i className="bi bi-github"></i>
                        Continue with GitHub
                    </button>

                </div>


                {/* Signup */}
                <div className="auth-footer">

                    <span>
                        Don't have an account?
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/signup")
                        }
                    >
                        Create account
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Login;