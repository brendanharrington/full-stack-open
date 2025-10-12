# Full Stack Open — Part 4  

This directory contains my solutions for **Part 4** of the [Full Stack Open](https://fullstackopen.com/en/) course by the University of Helsinki.  
Part 4 focuses on **Testing, User Administration, and Token-based Authentication** in a full stack application.

## blog-list  

Implements the backend for the Bloglist application. The server handles HTTP requests for creating, reading, updating, and deleting blogs and users, while connecting to a MongoDB database for persistence.  

**Concepts practiced:**  

- Setting up an Express server and defining API routes  
- Implementing **user authentication** using JWTs  
- Hashing passwords securely with **bcrypt**  
- Handling HTTP methods: GET, POST, PUT, DELETE  
- Using **MongoDB** and **Mongoose** for database integration, including relational references between users and blogs  
- Implementing middleware for **error handling, logging, token extraction, and user extraction**  
- Writing automated **backend tests** for users and blogs with Node.js test runner and Supertest  
- Validating request data and ensuring uniqueness constraints  