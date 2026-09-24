import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";

import {
    getMyProfile,
    updateMyProfile,
      changePassword,
      type ChangePasswordReq,
    type UserResponse,
    type UserUpdateReq
} from "../services/userService";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Profile() {
 const location = useLocation();
    const[user,setUser]=useState<UserResponse| null>(null);
        const [loading, setLoading] = useState(true);
        
        const [isEditing, setIsEditing] = useState(false);

const [formData, setFormData] = useState<UserUpdateReq>({
    name: "",
    email: "",
    phone: "",
    location: ""
});
///information from setting.tsx for change password

const [showPasswordForm, setShowPasswordForm] = useState(false);
useEffect(() => {

    if (location.state?.openPassword) {
        setShowPasswordForm(true);
    }

}, [location.state]);

const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
});
const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
) => {
    const { name, value } = e.target;

    setPasswordData(prev => ({
        ...prev,
        [name]: value
    }));
};
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFormData(prev => ({
        ...prev,
        [e.target.name]:e.target. value
    }));
};
    useEffect(()=>{
            const loadProfile=async()=>{
        try{
        
            const data=await getMyProfile();
            setUser(data);
            setFormData({
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    location: data.location || ""
});


        }
    
        catch(error){
            console.error("Faailed to load profile:",error);
        }
        finally {

                setLoading(false);

            }
        };
        loadProfile();
    },[]);
     if (loading) {
        return <p>Loading profile...</p>;
    }
    const handleSave = async () => {
    try {
        const updatedUser = await updateMyProfile(formData);

        setUser(updatedUser);

        setFormData({
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone || "",
            location: updatedUser.location || ""
        });

        setIsEditing(false);

    } catch (error) {
        console.error("Failed to update profile:", error);
    }
};
const handleChangePassword = async () => {

    if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert("New passwords do not match");
        return;
    }

    if (passwordData.newPassword.length < 6) {
        alert("New password must contain at least 6 characters");
        return;
    }

    try {

        const data: ChangePasswordReq = {
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword
        };

        const message = await changePassword(data);

        alert(message);

        setPasswordData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        });

        setShowPasswordForm(false);

    } catch (error) {
        console.error("Failed to change password:", error);
        alert("Failed to change password");
    }
};
  
    return (
        <div>

            <Sidebar />

            <div className="main-area">

                <TopHeader />

                <main className="profile-content">

                    {/* Page Header */}

                    <div className="profile-page-header">

                        <div>
                            <h1>Profile</h1>
                            <p>Manage your personal information and account.</p>
                        </div>

                        <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                            <i className="bi bi-pencil"></i>
                            Edit Profile
                        </button>

                    </div>


                    {/* Profile Overview */}

                    <section className="profile-card">

                        <div className="profile-overview">

                            <div className="profile-avatar">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>

                            <div className="profile-overview-info">
                                {user?.name}

                                <p>
                                    {user?.email}
                                </p>

                                <span className="profile-role">
                                    <i className="bi bi-person"></i>
                                    User
                                </span>
                            </div>

                        </div>

                    </section>


                    {/* Personal Information */}

                 <section className="profile-card">

    <div className="profile-section-header">
        <div>
            <h2>Personal Information</h2>
            <p>Your basic profile information.</p>
        </div>
    </div>

    {isEditing ? (

        <div className="row g-3">

            <div className="col-md-6">
                <label className="form-label">Full Name</label>

                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Email Address</label>

                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Phone Number</label>

                <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Location</label>

                <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                />
            </div>

            <div className="d-flex gap-2 mt-3">

                <button
                    className="btn btn-primary"
                    onClick={handleSave}
                >
                    Save Changes
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                >
                    Cancel
                </button>

            </div>

        </div>

    ) : (

        <div className="profile-info-grid">

            <div className="profile-info-item">
                <span>Full Name</span>
                <strong>{user?.name}</strong>
            </div>

            <div className="profile-info-item">
                <span>Email Address</span>
                <strong>{user?.email}</strong>
            </div>

            <div className="profile-info-item">
                <span>Phone Number</span>
                <strong>{user?.phone || "Not added"}</strong>
            </div>

            <div className="profile-info-item">
                <span>Location</span>
                <strong>{user?.location || "Not added"}</strong>
            </div>

        </div>

    )}

</section>


                    {/* Account Information */}

                    <section className="profile-card">

                        <div className="profile-section-header">

                            <div>
                                <h2>Account Information</h2>
                                <p>Information about your RESUMATE account.</p>
                            </div>

                        </div>

                        <div className="account-info-row">

                            <div className="account-info-left">
                                <div className="account-icon">
                                    <i className="bi bi-person-badge"></i>
                                </div>

                                <div>

                                    <span>User ID</span>

                                    <strong>
                                        {user?.id}
                                    </strong>

                                </div>
                            </div>

                        </div>

                        <div className="account-info-row">

                            <div className="account-info-left">
                                <div className="account-icon">
                                    <i className="bi bi-shield-check"></i>
                                </div>

                                <div>
                                    <span>Account Status</span>
                                    <strong className="active-status">
                                        Active
                                    </strong>
                                </div>
                            </div>

                        </div>

                    </section>


                  {/* Security */}

<section className="profile-card">

    {/* <div className="profile-section-header">
        <div>
            <h2>Security</h2>
            <p>Manage your account security.</p>
        </div>
    </div> */}

    <div className="security-row">

        <div className="account-info-left">

            <div className="account-icon">
                <i className="bi bi-shield-lock"></i>
            </div>

            <div>
                <strong>Password</strong>
                <p>
                    Keep your password secure and up to date.
                </p>
            </div>

        </div>

        {!showPasswordForm && (
            <button
                className="change-password-btn"
                onClick={() => setShowPasswordForm(true)}
            >
                <i className="bi bi-key me-2"></i>
                Change Password
            </button>
        )}

    </div>


    {showPasswordForm && (

        <div className="password-form mt-4">

            <hr />

            <div className="row g-3 mt-2">

                <div className="col-12">

                    <label className="form-label">
                        Current Password
                    </label>

                    <input
                        type="password"
                        name="oldPassword"
                        className="form-control"
                        placeholder="Enter current password"
                        value={passwordData.oldPassword}
                        onChange={handlePasswordChange}
                    />

                </div>


                <div className="col-md-6">

                    <label className="form-label">
                        New Password
                    </label>

                    <input
                        type="password"
                        name="newPassword"
                        className="form-control"
                        placeholder="Enter new password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                    />

                </div>


                <div className="col-md-6">

                    <label className="form-label">
                        Confirm New Password
                    </label>

                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Confirm new password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                    />

                </div>

            </div>


            <div className="d-flex gap-2 mt-4">

                <button
                    className="btn btn-primary"
                    onClick={handleChangePassword}
                >
                    <i className="bi bi-check2 me-2"></i>
                    Update Password
                </button>

                <button
                    className="btn btn-light border"
                    onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordData({
                            oldPassword: "",
                            newPassword: "",
                            confirmPassword: ""
                        });
                    }}
                >
                    Cancel
                </button>

            </div>

        </div>

    )}

</section>

                </main>

            </div>

        </div>
    );
}

export default Profile;