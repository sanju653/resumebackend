import { useState,useEffect } from "react";
import { getMyProfile } from "../services/userService";
import {  useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import{ logout as logoutApi } from "../services/authService"
function TopHeader() {

    const [showProfile, setShowProfile] = useState(false);
    const[user,setUser]=useState({name:""});
    // const[showName,setShowName]=useState(false);
    const navigate=useNavigate();
    const {logout,refreshToken}=useAuthStore();

  const handleLogout = async () => {

   

    try {

        if (refreshToken) {

           

            await logoutApi(refreshToken);

            

        } else {


        }

    } catch (error) {

        console.error("4. Backend logout failed:", error);

    } finally {

      
        logout();

      
        navigate("/login");
    }
};
        useEffect(()=>{
           const loadUser=async()=>{
                try{
                    const data=await getMyProfile();
                    setUser(data);
                    //setShowName(true);
                   
    
                }
                catch(error){
                    console.error("Failed to load user:",error)
                }
            }
            loadUser();
        },[]);

    return (
        <header className="top-header">

            <div className="header-right">

                {/* Notification
                <button className="header-icon">
                    <i className="bi bi-bell"></i>
                </button> */}


                {/* Profile */}
                <div className="profile-wrapper">

                    <button
                        className="profile-button"
                        onClick={() =>
                            setShowProfile(!showProfile)
                        }
                    >

                        <i className="bi bi-person-circle"></i>

                        <span>{user.name &&( user.name)}</span>

                        <i className="bi bi-chevron-down"></i>

                    </button>


                    {/* Dropdown */}
                    {showProfile && (

                        <div className="profile-dropdown">

                            <div className="profile-name">
                                {user.name}
                            </div>

                            <hr />

                            <button
                            onClick={()=>navigate("/profile")}>
                                <i className="bi bi-person me-2"></i>
                                My Profile
                            </button>

                            <button onClick={()=>navigate("/settings")}>
                                <i className="bi bi-gear me-2"></i>
                                Settings
                            </button>

                            <button onClick={handleLogout}>
                                <i className="bi bi-box-arrow-right me-2" ></i>
                                Logout
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>
    );
}

export default TopHeader;