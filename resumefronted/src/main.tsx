import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./styles/sidebar.css"
import "./styles/topheader.css"
import "./styles/dashboard.css"
import "./styles/resumes.css";
import "./styles/editor.css";
import "./styles/templates.css";
import "./styles/Profile.css"
import "./styles/settings.css"
import "./styles/analytics.css";
import "./styles/auth.css"
import "./styles/home.css"
import "./styles/modernTemplate.css"
import "./styles/classicTemplate.css"
import "./styles/minimalTemplate.css"
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css"
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </StrictMode>,
)
