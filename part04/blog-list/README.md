# Bloglist Application  

## Overview  

This repository contains my solutions for **Full Stack Open – Part 4: Testing, User Administration, and Authentication**, exercises **4.1–4.23**.  
These exercises focus on creating a backend for the Bloglist application using **Express** and **MongoDB**, implementing **user authentication with JWT**, writing automated tests for the backend, and improving the application structure.

## Exercises  

### 4.1–4.8: Basic Blog API and Initial Setup  

The initial exercises involve setting up the Express server, defining routes for blogs, and implementing basic CRUD operations. Data is stored in MongoDB, and schemas for blogs are defined using Mongoose.

**Concepts practiced:**  

- Setting up an Express server  
- Handling GET, POST, PUT, DELETE requests  
- Using Mongoose schemas and models  
- Validating data and handling errors  
- Writing helper functions to interact with the database  

### 4.9–4.14: Testing Blog API  

Tests are written to verify the backend functionality, including creating, retrieving, updating, and deleting blogs. Tests ensure data integrity and correct response codes.

**Concepts practiced:**  

- Writing automated tests with Node.js test runner and Supertest  
- Verifying HTTP status codes and JSON responses  
- Ensuring proper handling of invalid requests  
- Managing database state during tests  

### 4.15–4.16: User Management  

These exercises cover creating and managing users, including hashing passwords with **bcrypt** and validating user input. Unique usernames are enforced, and proper error handling is implemented for invalid user data.

**Concepts practiced:**  

- Creating users via POST requests  
- Password hashing with bcrypt  
- Validating usernames and passwords  
- Handling errors and sending appropriate HTTP responses  
- Writing tests for user creation and validation  

### 4.17: Blog Creation with User References  

Each blog is associated with a creator. Blogs are created with a reference to a user in the database, and blog listings are populated to include creator information.

**Concepts practiced:**  

- Using Mongoose references between schemas (users ↔ blogs)  
- Populating referenced documents for GET requests  
- Associating newly created blogs with a user  
- Displaying user information when listing blogs  

### 4.18–4.19: Token-based Authentication  

Introduces **JWT authentication** for secure access to blog creation and deletion. Only authenticated users can create blogs, and each blog stores the creator’s ID.

**Concepts practiced:**  

- Generating and verifying JWT tokens  
- Protecting routes with token-based authentication  
- Assigning the creator of a blog based on the token  
- Returning appropriate status codes for unauthorized access  

### 4.20–4.22: Middleware for Authentication and User Extraction  

Middleware functions are implemented to extract tokens from request headers and identify the user making the request. This allows secure blog creation and deletion operations tied to the authenticated user.

**Concepts practiced:**  

- Writing custom Express middleware  
- Extracting tokens and user information from requests  
- Attaching user objects to request for route handlers  
- Restricting blog deletion to the creator only  

### 4.23: Testing with Node.js Test Runner and Supertest  

Automated tests are written for both users and blogs to ensure all functionality works as expected, including authentication, validation, and error handling. Tests cover creation, retrieval, updating, and deletion.

**Concepts practiced:**  

- Writing backend tests using Node.js test runner and Supertest  
- Verifying proper status codes and JSON responses  
- Testing authentication and authorization logic  
- Ensuring database state before and after tests
