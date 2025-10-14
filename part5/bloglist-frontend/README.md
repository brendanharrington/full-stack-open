# Bloglist Frontend  

## Overview  

This repository contains my solutions for **Full Stack Open – Part 5: Testing React Apps**, exercises **5.1–5.12**.  
These exercises focus on creating a frontend for the Bloglist application using **React**, implementing **login functionality, CRUD operations for blogs, conditional rendering, notifications, and styling**, and preparing the frontend for testing.

## Exercises  

### 5.1–5.2: Login Functionality  

Implement login functionality for the frontend. The token returned with a successful login is saved to the application's state. Users can log in and log out, and login information can optionally be stored in local storage.

**Concepts practiced:**  

- Conditional rendering based on user state  
- Handling user login and logout  
- Storing user session in local storage  
- Displaying appropriate views depending on authentication  

### 5.3–5.5: Adding Blogs and Conditional Forms  

Allow logged-in users to add new blogs. Implement the new blog form using conditional rendering or a Togglable component.

**Concepts practiced:**  

- Creating and submitting forms  
- Conditional rendering of components  
- Lifting state to components or encapsulating it inside a child component  
- Expanding and hiding forms dynamically  

### 5.6–5.7: Component Separation and Details Toggle  

Separate the new blog form into its own component and add functionality to show/hide full blog details using a button.

**Concepts practiced:**  

- Component decomposition  
- Managing local state inside child components  
- Toggling visibility of content  
- Adding simple CSS styles to components  

### 5.8–5.11: Blog Likes, Sorting, and Deletion  

Implement the like button functionality, ensure blogs show the creator's name, sort blogs by likes, and allow the creator to delete their blogs.

**Concepts practiced:**  

- Making HTTP PUT requests to update blog likes  
- Handling relational data (blogs linked to users)  
- Sorting arrays in the frontend  
- Conditional rendering of delete buttons  
- Using `window.confirm` for delete confirmation  

### 5.12: ESLint Integration  

Add and configure ESLint to the project and fix all linter errors.

**Concepts practiced:**  

- Integrating ESLint with Vite  
- Configuring rules and resolving linting issues  
- Maintaining code quality and consistency
