import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

function ProtectedRoute() {

   const accessToken = useAuthStore(
        (state) => state.accessToken
    );
     const isLoggedIn = useAuthStore(
        (state) => state.isLoggedIn
    );
    const location = useLocation();
     console.log("PROTECTED ROUTE:");
    console.log("accessToken:", accessToken);
    console.log("isLoggedIn:", isLoggedIn);

    if (!accessToken || !isLoggedIn) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
}

export default ProtectedRoute;