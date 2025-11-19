# Phonebook Backend Application  

## Overview  
This repository contains my solutions for **Full Stack Open – Part 3: Programming a Server with NodeJS and Express**, exercises **3.1–3.22**.  
These exercises focus on creating a backend for the Phonebook application using **Express** and **MongoDB**, and deploying it to a live environment on **Render**.

## Exercises  

### 3.1–3.8: Building the Express Server  
The initial exercises involve setting up a basic Node.js and Express server that can handle HTTP requests for retrieving and adding phonebook entries. Data is stored in memory during this stage.

**Concepts practiced:**  
- Setting up an Express server  
- Handling GET and POST requests  
- Using middleware for JSON parsing and logging  
- Implementing simple RESTful API routes  

### 3.9–3.11: Serving the Frontend  
The server is configured to serve the built frontend application from Part 2, creating a full stack deployment. Environment variables and middleware are introduced to manage the app’s configuration and static file handling.

**Concepts practiced:**  
- Serving static files with Express  
- Configuring environment variables  
- Integrating frontend and backend in a single deployment  

### 3.12–3.18: Connecting to MongoDB  
These exercises introduce persistent storage by connecting the server to a MongoDB database using Mongoose. The API is expanded to include full CRUD functionality with data validation and error handling.

**Concepts practiced:**  
- Using Mongoose to define schemas and models  
- Performing CRUD operations with MongoDB  
- Implementing error handling for invalid IDs and requests  
- Structuring the backend code into separate modules  

### 3.19–3.22: Deployment on Render  
The final exercises focus on deploying the full stack application to **Render**. The backend is configured for production with appropriate logging, environment variables, and build settings.

**Concepts practiced:**  
- Deploying an Express + MongoDB app to Render  
- Environment-based configuration management  
- Implementing production-grade error handling and middleware  
- Verifying full stack functionality in a live environment  
