# Full Stack Open — Part 5  

This directory contains my solutions for **Part 5** of the [Full Stack Open](https://fullstackopen.com/en/) course by the University of Helsinki.  
Part 5 focuses on **Testing React Applications**, including unit tests, component tests, and end-to-end tests.

## bloglist-frontend  

Implements the frontend for the Bloglist application. Users can view blogs, create new blogs, like them, and delete blogs they have added. This part emphasizes testing the React components and application behavior.

**Concepts practiced:**  

- Writing **unit tests** for React components using **Jest** and **React Testing Library**  
- Testing component rendering, props, and event handlers  
- Mocking functions and API calls for isolated tests  
- Simulating **user interactions** like clicks and form submissions  
- Testing **async behavior** and state updates in components  

## bloglist-backend  

Implements the backend for the Bloglist application. The server handles HTTP requests for creating, reading, updating, and deleting blogs and users, while connecting to a MongoDB database for persistence.

**Concepts practiced:**  

- Setting up an **Express** server and defining API routes  
- Implementing **user authentication** using JWTs  
- Hashing passwords securely with **bcrypt**  
- Handling HTTP methods: GET, POST, PUT, DELETE  
- Using **MongoDB** and **Mongoose** for database integration, including relational references between users and blogs  
- Implementing middleware for **error handling, logging, token extraction, and user extraction**  
- Writing automated **backend tests** with Node.js test runner and Supertest  

## playwright-test  

Contains **end-to-end tests** for the Bloglist application using **Playwright**. These tests simulate real user interactions with the frontend while verifying backend responses.

**Concepts practiced:**  

- Writing **Playwright tests** for UI flows like login, creating blogs, liking, and deleting blogs  
- Testing **integration between frontend and backend**  
- Using **fixtures** and test setup/teardown for consistent test environments  
- Automating **browser interactions** and validating dynamic content  
