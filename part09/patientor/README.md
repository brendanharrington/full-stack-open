# patientor

## Overview

This repository contains my solutions for **Full Stack Open – Part 9: TypeScript**, exercises **9.8–9.14** and **9.21–9.30**.  
The **Patientor** project is a medical record management application designed for doctors to handle patient information and diagnoses. The frontend was pre-built, and these exercises focus on developing a TypeScript-based backend and extending the frontend with type-safe functionality, validation, and data integration.  

## Exercises  

### 9.8–9.9: Backend Setup and Ping Endpoint

These exercises establish the backend environment for Patientor using TypeScript and Express.  

- Initialize a TypeScript project with ESLint and tsconfig configurations.
- Add an `/api/ping` endpoint that responds to GET requests to confirm connectivity with the frontend.  
- Ensure the project can be run in both development (`ts-node-dev`) and production (compiled JS) modes.  

**Concepts practiced:**

- Project initialization with TypeScript and Express  
- Type checking and ESLint configuration  
- Using npm scripts for different build modes  

### 9.10–9.11: Diagnoses and Patients Endpoints

The backend is expanded to serve medical data from hardcoded files (`diagnoses.ts`, `patients.ts`).  

- Create a `Diagnosis` type and implement `/api/diagnoses` to fetch all diagnoses.
- Create a `Patient` type and implement `/api/patients` to return all patients excluding sensitive information (like `ssn`).  
- Use TypeScript’s `Omit` utility type to safely exclude fields.  

**Concepts practiced:**

- Defining and using TypeScript interfaces  
- Implementing RESTful endpoints  
- Type-safe field selection with utility types  

### 9.12–9.14: Adding and Validating Patients

The backend is enhanced with functionality to add new patients and ensure proper validation.  

- Implement a POST `/api/patients` endpoint to add new patients with unique UUIDs.  
- Add runtime validation and safe parsing for patient data.  
- Refactor the `gender` field into an enum and validate POST requests using **Zod** for schema validation.  

**Concepts practiced:**

- Data validation with TypeScript and Zod  
- Enum usage for stricter typing  
- Runtime type safety and error handling  

### 9.21–9.22: Patient Details and Frontend Integration

These exercises integrate the backend and frontend to handle individual patient data.  

- Implement a `/api/patients/:id` endpoint returning detailed patient data, including entries (initially empty).  
- Create a new frontend page to view individual patient details, fetching full data from the backend.  
- Use React Router for navigation between patients.  

**Concepts practiced:**  

- Dynamic routing with React Router
- Fetching and rendering detailed patient data  
- Shared TypeScript types between backend and frontend  

### 9.23–9.26: Expanding Patient Entries

The Patientor application evolves to support detailed health entries and diagnoses.  

- Define new entry types (`HospitalEntry`, `OccupationalHealthcareEntry`, etc.) with proper backend typing.  
- Display patient entries in the frontend, including descriptions, dates, and diagnosis codes.  
- Fetch diagnosis data and show their descriptions.  
- Implement exhaustive type checking and conditional rendering for different entry types.  

**Concepts practiced:**

- Discriminated union types for entries  
- Type-safe rendering in React  
- Integrating backend and frontend data sources  

### 9.27–9.30: Adding New Entries

The final exercises complete the Patientor system by enabling new entry creation.  

- Create `/api/patients/:id/entries` POST endpoint to add new entries to patients.  
- Implement frontend forms for submitting entries.  
- Extend form support to multiple entry types and improve validation using Material UI components.  
- Use date pickers, multiple select inputs, and rating fields for a user-friendly, type-safe experience.  

**Concepts practiced:**

- Full CRUD operations with TypeScript and Express  
- Type-safe form handling in React  
- Complex form validation and UI integration with Material UI
