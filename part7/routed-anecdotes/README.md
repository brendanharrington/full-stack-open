# Routed Anecdotes  

## Overview  

This repository contains my solutions for **Full Stack Open – Part 7**, exercises **7.1–7.6**, which extend the anecdote application from earlier parts of the course.  
The focus of this section is on implementing **React Router** for navigation and **custom hooks** to simplify form handling and improve reusability.  
By the end of these exercises, the application supports dynamic routes, form-based anecdote creation, user notifications, and reusable input field logic through hooks.  

## 7.1–7.3: Routing and Navigation  

These exercises introduce **React Router** to transform the anecdote app into a multi-page single-page application.  

- Integrated **React Router** to manage client-side navigation.  
- Added a `Menu` component with navigation links for the main list, creation form, and about page.  
- Created a **dynamic route** `/anecdotes/:id` to display individual anecdotes.  
- Implemented **programmatic navigation** using `useNavigate` to redirect users back to the main list after submitting a new anecdote.  
- Added a **notification system** that displays messages for five seconds upon successful actions.  
- Ensured the `Footer` remains visible on all views for consistent layout.  

**Concepts practiced:**  

- Defining routes with `Route` and `Routes` components  
- Using `Link`, `useParams`, and `useNavigate` from **react-router-dom**  
- Managing UI flow and user feedback through navigation and timed notifications  

## 7.4–7.6: Custom Hooks and Form Management  

The later exercises focus on simplifying form logic through **custom React hooks**.  

- Created a `useField` hook to manage input value, type, and change handlers.  
- Refactored the anecdote creation form to use this reusable hook instead of individual `useState` calls.  
- Extended the hook to include a **reset** function for clearing input fields.  
- Updated the hook implementation to prevent invalid props (e.g., `reset`) from being passed to DOM elements, ensuring clean and warning-free rendering.  

The hooks are organized under `/src/hooks/index.js` and use **named exports** for modular design and easy imports.  

**Concepts practiced:**  

- Writing **custom hooks** for reusable stateful logic  
- Returning structured values and functions from hooks  
- Using the **spread operator** safely in JSX  
- Managing form resets and preventing prop-spreading issues  