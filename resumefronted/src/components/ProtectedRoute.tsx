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