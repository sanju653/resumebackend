import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../store/authStore";

const OAuth2Success = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);

    useEffect(() => {

        const accessToken =
            searchParams.get("accessToken");

        const refreshToken =
            searchParams.get("refreshToken");

        if (accessToken && refreshToken) {

            login(
                accessToken,
                refreshToken,
                true
            );

            navigate("/dashboard", { replace: true });

        } else {

            navigate("/login", { replace: true });
        }

    }, [searchParams, login, navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">

                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p className="mt-3">
                    Signing you in...
                </p>

            </div>
        </div>
    );
};

export default OAuth2Success;