import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { logout as logoutApi } from "../services/authService";
function Sidebar() {

    const [isOpen, setIsOpen] = useState(false);
const navigate=useNavigate();
const { logout, refreshToken} = useAuthStore();
    const closeSidebar = () => {
        setIsOpen(false);
    };

    const handleLogout =async () => {

        try{
            if(refreshToken){
                await logoutApi(refreshToken);
            }
        }catch(error){
            console.error(
                "Backend logout failed:",
                error
            );
        }
        finally {

            logout();

            navigate("/login");
        }
  
};

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="mobile-menu-button"
                onClick={() => setIsOpen(true)}
            >
                <i className="bi bi-list"></i>
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={closeSidebar}
                ></div>
            )}

            <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>

                <div className="sidebar-logo">
                    RESUMATE

                    {/* Mobile Close Button */}
                    <button
                        className="sidebar-close"
                        onClick={closeSidebar}
                    >
                        <i className="bi bi-x"></i>
                    </button>
                </div>

                <nav className="sidebar-nav">

                    <NavLink
                        to="/dashboard"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        <i className="bi bi-house"></i>
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/resumes"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        <i className="bi bi-file-earmark-text"></i>
                        <span>My Resumes</span>
                    </NavLink>

                    <NavLink
                        to="/templates"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        <i className="bi bi-stars"></i>
                        <span>Templates</span>
                    </NavLink>

                    <NavLink
                        to="/analytics"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        <i className="bi bi-bar-chart"></i>
                        <span>Analytics</span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        <i className="bi bi-gear"></i>
                        <span>Settings</span>
                    </NavLink>

                </nav>

                <div className="sidebar-bottom">

                    <NavLink
                        to="/profile"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        <i className="bi bi-person"></i>
                        <span>Profile</span>
                    </NavLink>

                    <button className="sidebar-link sidebar-logout"
                    onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                    </button>

                </div>

            </aside>
        </>
    );
}

export default Sidebar;