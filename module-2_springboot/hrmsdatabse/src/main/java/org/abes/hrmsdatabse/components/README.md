# Nexora HRMS — redesigned React components

This folder contains the redesigned frontend component layer. It is intended to replace the existing HRMS component folder; it does not include or modify the Spring Boot backend, router, package configuration, environment files, or database setup.

## Included files

```text
components/
├── Home.jsx
├── Home.css
├── Login.jsx
├── Login.css
├── Registration.jsx
├── Registration.css
├── Dashboard.jsx
├── Dashboard.css
├── UseFetchApi.jsx
├── UseFetchApi.css
├── SampleCode.jsx
├── SampleCode.css
└── shared/
    ├── NexoraBrand.jsx
    ├── NexoraUI.css
    └── Auth.css
```

## Design direction

The UI uses the supplied Nexora login reference as the primary visual direction: warm ivory surfaces, soft yellow highlights, a dark charcoal primary action, rounded cards, restrained shadows, and a responsive employee-first layout. The dashboard follows the supplied HR dashboard reference while using only metrics and workflows supported by the provided Spring Boot API.

## Backend integration retained

The components use the existing API base URL convention:

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
```

The current Spring Boot endpoints used by the components are:

- `POST /v1/user/login?admission_no=...&password=...`
- `POST /v1/user/addemp`
- `GET /v1/user/attendance/by-employee/{empId}`
- `POST /v1/user/attendance/markattendance`
- `PUT /v1/user/updatebyid/{empId}`
- `GET /v1/user/` (service connection check)

Registration sends the Java model's expected JSON property names: `empId`, `empName`, `designation`, `stack`, and `password`. The password is required by the backend service, even though it was missing from the original registration form.

The dashboard's check-in action sends the employee ID and a local `HH:mm:ss` check-in time. The backend sets the attendance date. Profile editing updates only `empName`, `designation`, and `stack`, matching the provided `EmployeeService.updateEmployeeById` implementation.

## Routes expected by the current component code

The existing navigation targets are preserved:

- `/` — `Home`
- `/Login` — `Login`
- `/Registration` — `Registration`
- `/Dashboard` — `Dashboard`

Keep your current router configuration and map these components to the routes already used by your app. No router changes are included in this package.

## Setup

1. Back up your current component folder.
2. Replace its component files with the files in this package, preserving the `shared/` subfolder.
3. Keep the existing React, React Router, and Vite setup.
4. Set `VITE_API_BASE_URL` when the backend is not running at `http://localhost:8080`.
5. Start the backend and frontend as usual.

No new npm packages are required. The shared stylesheet optionally loads DM Sans and Manrope from Google Fonts; system sans-serif fallbacks are included.

## Scope notes

The supplied backend does not expose leave, payroll, holiday, approval, or all-employee listing APIs. Those features are intentionally not represented as working dashboard features. This package only changes the frontend component layer and leaves backend and application configuration files untouched.
