# Bloglist Backend  

## Overview  

This repository contains my solutions for **Full Stack Open – Part 5: Testing React Apps**, exercises **5.8–5.12** as they relate to backend integration.  
The backend handles HTTP requests for blogs and users, supports authentication, persists data in **MongoDB**, and ensures data consistency for frontend operations.

## Exercises  

### 5.8–5.9: Blog Likes and User References  

Update the backend to handle blog likes and ensure each blog stores the user who created it. Fix issues with missing user information after likes.

**Concepts practiced:**  

- Updating blogs with HTTP PUT requests  
- Handling Mongoose references between users and blogs  
- Ensuring frontend and backend data consistency  
- Correcting bugs related to missing data after updates  

### 5.10–5.11: Sorting and Deletion  

Support sorting blogs by likes on the backend and allow deletion of blogs only by the user who created them.

**Concepts practiced:**  

- Implementing conditional access to routes  
- Securing delete operations with user verification  
- Returning appropriate HTTP status codes for unauthorized actions  
- Integrating backend logic with frontend behavior  

### 5.12: ESLint and Code Quality  

Add ESLint to the backend project and fix any issues.

**Concepts practiced:**  

- Configuring ESLint for Node.js projects  
- Ensuring consistent coding style  
- Preventing common mistakes through linting
