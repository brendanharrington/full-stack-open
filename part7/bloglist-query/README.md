# Bloglist Query  

## Overview  

This repository contains my solutions for **Full Stack Open – Part 7: React Query and Context**, exercises **7.9–7.21**.  
The project continues from the previous Bloglist app and introduces **React Query** for asynchronous state management and **React Context** for managing notifications and user data.  

The application allows users to log in, create, like, and delete blogs. Blog data is synced with the backend using React Query’s caching and mutation mechanisms.  

---

## Exercises 7.9–7.13: React Query and Context Implementation  

### Code Formatting and Project Setup (7.9)

- Integrated **Prettier** for consistent, automatic code formatting.  
- Ensured the editor auto-formats code on save for improved readability and maintainability.  

### Notification Management (7.10)

- Implemented global notification handling using **useReducer** and **Context API**.  
- Enabled consistent alert messages across components for events like blog creation or login actions.  

### Blog Data with React Query (7.11–7.12)

- Replaced manual state management for blogs with **React Query**.  
- Implemented automatic fetching, caching, and invalidation for blogs.  
- Added functionality for creating, liking, and deleting blogs using React Query’s mutation hooks.  

### User Management with Context (7.13)

- Managed logged-in user information globally using **Context** and **useReducer**.  
- Simplified login/logout flow while maintaining persistent session data.  