# Resume Builder

A full-stack Resume Builder web application that allows users to create, manage, customize, and preview professional resumes.

The project is built with **Spring Boot** for the backend and **React + TypeScript** for the frontend.

## 🚀 Features

* User registration and login
* JWT-based authentication
* OAuth2 authentication
* Forgot password and reset password
* Create and manage multiple resumes
* Personal information management
* Education management
* Experience management
* Project management
* Skills management
* Certifications management
* Social links management
* Multiple resume templates
* Live resume preview
* Resume PDF generation
* User profile management
* Change password
* User settings
* Light/Dark theme
* Accent color customization
* Email notification settings
* Resume reminder settings
* Responsive dashboard

## 🛠️ Technologies Used

### Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* JWT
* OAuth2
* MySQL
* Maven
* Lombok
* OpenAPI / Swagger

### Frontend

* React
* TypeScript
* Vite
* React Router
* Axios
* Bootstrap
* Bootstrap Icons
* Zustand

## 📁 Project Structure

```text
ResumeBuilder/
│
├── resumebackend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── ...
│
├── resumefronted/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── styles/
│   │   └── templates/
│   ├── package.json
│   └── ...
│
└── README.md
```

## 🔐 Authentication

The application uses JWT-based authentication.

Authentication features include:

* Registration
* Login
* JWT access token
* Protected routes
* Current user information
* Password change
* Forgot password
* Reset password
* OAuth2 authentication

## 📄 Resume Management

Users can create multiple resumes and manage different sections independently.

Each resume can contain:

* Personal information
* Professional summary
* Education
* Experience
* Projects
* Skills
* Certifications
* Social links

## 🎨 Resume Templates

The application provides multiple resume templates:

* Modern
* Classic
* Minimal

Users can select a template and preview their resume before generating the final document.

## ⚙️ Settings

Users can customize application preferences including:

* Default resume template
* Accent color
* Light/Dark theme
* Email notifications
* Resume reminders

## 🖥️ Running the Project

### Backend

Navigate to the backend folder:

```bash
cd resumebackend
```

On Windows, run:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend requires a MySQL database.

Configure the database connection in:

```text
resumebackend/src/main/resources/application.properties
```

### Frontend

Open another terminal and navigate to the frontend:

```bash
cd resumefronted
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## 🔗 Application Architecture

```text
React Frontend
      │
      │ Axios / HTTP
      ▼
Spring Boot REST API
      │
      │ Spring Data JPA
      ▼
    MySQL
```

### Authentication Flow

```text
React
  │
  │ Login
  ▼
Spring Security
  │
  ▼
JWT Authentication
  │
  ▼
Protected REST APIs
```

## 🏗️ Backend Architecture

The backend follows a layered architecture:

```text
Controller
     ↓
Service
     ↓
Repository
     ↓
Database
```

Main backend modules include:

* Authentication
* Users
* Resumes
* Education
* Experience
* Projects
* Skills
* Certifications
* Social Links
* Settings

## 🖥️ Frontend Structure

```text
src/
├── components/
├── context/
├── pages/
├── services/
├── store/
├── styles/
└── templates/
```

The frontend uses reusable components, API service classes, protected routes, and centralized authentication state.

## 🔒 Security

The project uses:

* Spring Security
* JWT authentication
* BCrypt password hashing
* Protected API endpoints
* Protected frontend routes
* OAuth2 authentication

Sensitive configuration such as database passwords, JWT secrets, OAuth credentials, and email credentials should not be committed to GitHub.

## 👨‍💻 Author

**Sanju Sahu**

GitHub: [@sanju653](https://github.com/sanju653)

## 📜 License

This project is developed for learning and portfolio purposes.
