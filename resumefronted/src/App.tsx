import { BrowserRouter,Routes,Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyResumes from "./pages/MyResumes";
import ResumeEditor from "./pages/ResumeEditor";
import Templates from "./pages/Templates";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import TemplatePreview from "./pages/TemplatePreview";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OAuth2Success from "./pages/OAuth2Success";
export default function APP(){
  return(
   
   < BrowserRouter>
  

   <Routes>
   <Route path="/" element={<Home />}/>
   <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
     <Route path="/templates/:resumeId?" element={<Templates />} />
     <Route
    path="/reset-password"
    element={<ResetPassword />}
/>
     <Route
        path="/forgot-password"
        element={<ForgotPassword />}
    />
<Route
    path="/oauth2/success"
    element={<OAuth2Success />}
/>
 <Route element={<ProtectedRoute />}>

    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/resumes" element={<MyResumes />} />
    <Route path="/resume/new" element={<ResumeEditor />} />
    <Route path="/resume/:resumeId" element={<ResumeEditor />} />
    <Route path="/templates/:templateName/:resumeId" element={<TemplatePreview />}/>
    <Route path="/profile" element={<Profile />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/analytics" element={<Analytics />} />
   </Route>

   </Routes>

   </BrowserRouter>
  
  );
}




