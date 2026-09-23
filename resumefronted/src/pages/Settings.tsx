import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import { useEffect, useState } from "react";
import {
    getSettings,
    updateSettings,
 
    type UserSettingsReq
} from "../services/settingservice";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { deleteMyAccount } from "../services/userService";
import useAuthStore from "../store/authStore";

//Settings page has two different types of data


function Settings() {
     const navigate = useNavigate();
     const { logout } = useAuthStore();

const { theme, setTheme , accentColor, setAccentColor} = useTheme();
   //1.UI/theme data
//Why do we need this if we already have theme and accentColor from Context?

//Because settings contains all settings(includind=g email,resume notification), not just appearance.(themecontext has only :theme,accentcolor)
     const [settings, setSettings] = useState<UserSettingsReq>({
        defaultTemplate: "Modern",
        accentColor: "blue",
        theme: "light",
        emailNotifications: true,
        resumeReminders: false
    });//2.User settings data stored in backend

//  Why do we have theme in two places? theme:from contex and settings.theme  inside local state.
//they have slightly different jobs. theme:controls the actual application appearance.
//settings.theme:represents the complete settings object that we send to the backend.Same idea for accent.

const handleDeleteAccount = async () => {

    const confirmed = window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) {
        return;
    }

    try {
        await deleteMyAccount();

        logout();

        alert("Your account has been deleted successfully.");

        navigate("/login");

    } catch (error) {
        console.error("Failed to delete account:", error);

        alert("Failed to delete your account. Please try again.");
    }
};

const handleSave = async () => {

        try {

            

             await updateSettings({
            ...settings,
            theme: theme, accentColor: accentColor
        });
            alert("Settings saved successfully.");

        } catch (error) {

            console.error("Failed to update settings", error);

           alert("Failed to save settings.");

        } 
    };

    


        // Load settings when page opens
    useEffect(() => {

        const loadSettings = async () => {

            try {

                const data = await getSettings();

                setSettings({
                    defaultTemplate: data.defaultTemplate,
                    accentColor: data.accentColor,
                    theme: data.theme,
                    emailNotifications: data.emailNotifications,
                    resumeReminders: data.resumeReminders
                });
//update the global theme
                setTheme(data.theme as "light" | "dark");
                setAccentColor(
    data.accentColor as "blue" | "dark" | "green" | "purple"
);

//setTheme("dark")
//      ↓
// React state = dark
//       ↓
// localStorage = dark
//       ↓
// <html data-theme="dark">
//       ↓
// CSS variables change
//       ↓
// whole application becomes dark


            } catch (error) {

                console.error("Failed to load settings", error);

            } finally {

           

            }
        };

        loadSettings();

    }, []);//[]means=Run this effect once when the Settings component is mounted.

    // This is a generic function for changing settings
    const handleChange = (
        field: keyof UserSettingsReq,
        value: string | boolean
    ) => {

        setSettings(prev => ({
            ...prev,
            [field]: value
        }));

    };



    return (
        <div>

            <Sidebar />

            <div className="main-area">

                <TopHeader />

                <main className="settings-content">

                    {/* Page Header */}

                    <div className="settings-page-header">
                        <div>
                            <h1>Settings</h1>
                            <p>
                                Manage your preferences and account settings.
                            </p>
                        </div>
                    </div>


                    {/* Resume Preferences */}

                    <section className="settings-card">

                        <div className="settings-section-header">
                            <h2>Resume Preferences</h2>
                            <p>
                                Customize your default resume experience.
                            </p>
                        </div>

                        <div className="setting-row">

                            <div>
                                <strong>Default Template</strong>
                                <p>
                                    Choose the template used when creating a new resume.
                                </p>
                            </div>

                            <select className="settings-select"
                             value={settings.defaultTemplate}//This means the selected option is controlled by React
                                onChange={(e) =>
                                    handleChange(
                                        "defaultTemplate",
                                        e.target.value
                                    )
                                }
                            >
                                <option>Modern</option>
                                <option>Classic</option>
                                <option>Minimal</option>
                            </select>

                        </div>

                        <div className="setting-row">

                            <div>
                                <strong>Accent Color</strong>
                                <p>
                                    Choose the primary color for your resume design.
                                </p>
                            </div>

                            <div className="color-options">

                                <button
                                type="button"
                               className={`color-option blue ${
                                        settings.accentColor === "blue"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => {
            setAccentColor("blue");//this immediately changes the global application accent.
            handleChange("accentColor", "blue");//his updates the settings object that will eventually be saved to backend.
        }}
                                 
                                 
                                 ></button>
                               <button
                                    type="button"
                                    className={`color-option dark ${
                                        settings.accentColor === "dark"
                                            ? "active"
                                            : ""
                                    }`}
                                   onClick={() => {
            setAccentColor("dark");
            handleChange("accentColor", "dark");
        }}
                                ></button>


                                <button
                                    type="button"
                                    className={`color-option green ${
                                        settings.accentColor === "green"
                                            ? "active"
                                            : ""
                                    }`}
                                     onClick={() => {
            setAccentColor("green");
            handleChange("accentColor", "green");
        }}
                                ></button>


                                <button
                                    type="button"
                                    className={`color-option purple ${
                                        settings.accentColor === "purple"
                                            ? "active"
                                            : ""
                                    }`}
 onClick={() => {
            setAccentColor("purple");
            handleChange("accentColor", "purple");
        }}
                                ></button>
                            </div>

                        </div>

                    </section>


                    {/* Appearance */}

                    <section className="settings-card">

                        <div className="settings-section-header">
                            <h2>Appearance</h2>
                            <p>
                                Choose how RESUMATE looks for you.
                            </p>
                        </div>

                        <div className="setting-row">

                            <div>
                                <strong>Theme</strong>
                                <p>
                                    Select your preferred interface theme.
                                </p>
                            </div>

                            <div className="theme-options">

                                <button
                                    type="button"
                                    className={`theme-option ${
                                        theme === "light"
                                            ? "active"
                                            : ""
                                    }`}
                                  onClick={() => setTheme("light")}
                                >
                                    <i className="bi bi-sun"></i>
                                    Light
                                </button>

                               <button
                                    type="button"
                                    className={`theme-option ${
                                        theme === "dark"
                                            ? "active"
                                            : ""
                                    }`}
                                onClick={() => setTheme("dark")}
                                                            >
                                <i className="bi bi-moon"></i>
                                Dark
                            </button>

                            </div>

                        </div>

                    </section>


  {/* You don't need:   handleChange("theme", "dark")because your setTheme() already updates the global theme and localStorage. */}
                    {/* Notifications */}

                    <section className="settings-card">

                        <div className="settings-section-header">
                            <h2>Notifications</h2>
                            <p>
                                Manage notifications and email preferences.
                            </p>
                        </div>

                        <div className="setting-row">

                            <div>
                                <strong>Email Notifications</strong>
                                <p>
                                    Receive important updates about your account.
                                </p>
                            </div>

                            <label className="toggle">

                                <input
                                    type="checkbox"
                                   checked={settings.emailNotifications}//This means React controls whether the checkbox is checked.
                                    onChange={(e) =>
        handleChange(
            "emailNotifications",
            e.target.checked
        )
    }
                                />

                                <span></span>

                            </label>

                        </div>

                        <div className="setting-row">

                            <div>
                                <strong>Resume Reminders</strong>
                                <p>
                                    Get reminders when your resume needs attention.
                                </p>
                            </div>

                            <label className="toggle">

                             <input
    type="checkbox"
    checked={settings.resumeReminders}
    onChange={(e) =>
        handleChange(
            "resumeReminders",
            e.target.checked
        )
    }
/>

                                <span></span>

                            </label>

                        </div>

                    </section>
                    <div className="settings-save-area">

    <button
        type="button"
        className="settings-save-btn"
        onClick={handleSave}
    >
        Save Changes
    </button>

</div>


                    {/* Account */}

                    <section className="settings-card danger-card">

                        <div className="settings-section-header">
                            <h2>Account</h2>
                            <p>
                                Manage your account and security.
                            </p>
                        </div>

                        <div className="setting-row">

                            <div>
                                <strong>Change Password</strong>
                                <p>
                                    Update your account password.
                                </p>
                            </div>

                          <button
                                type="button"
                                className="settings-action-btn"
                                onClick={() =>
                                    navigate("/profile", {
                                        state: { openPassword: true }//sending a small piece of information to Profile.
                                    })
                                }
                            >
                                Change Password
                            </button>

                        </div>

                        <div className="setting-row delete-row">

                            <div>
                                <strong>Delete Account</strong>
                                <p>
                                    Permanently delete your RESUMATE account and data.
                                </p>
                            </div>

                            <button className="delete-account-btn"
                             onClick={handleDeleteAccount}>
                                Delete Account
                            </button>

                        </div>

                    </section>

                </main>

            </div>

        </div>
    );
}

export default Settings;