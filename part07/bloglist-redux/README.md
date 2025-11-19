# Bloglist Redux  

## Overview  

This repository contains my solutions for **Full Stack Open – Part 7: Redux**, exercises **7.9–7.21**.  
The project builds on the Bloglist app from earlier parts, refactoring it to use **Redux** for state management.  

Users can log in, view, create, like, and delete blogs. Redux is used to manage notifications, blog data, and user information globally.  

## Exercises 7.9–7.13: Redux Implementation  

### Code Formatting and Project Setup (7.9)

- Configured **Prettier** for automatic code formatting on save.  
- Ensured style consistency throughout the project.  

### Notifications with Redux (7.10)

- Implemented a Redux slice for handling notifications.  
- Added timed notifications that clear automatically after a delay.  

### Blogs in Redux Store (7.11–7.12)

- Moved blog-related state management fully into Redux.  
- Implemented actions and reducers for fetching, adding, liking, and deleting blogs.  
- Improved scalability by centralizing logic and minimizing prop drilling.  

### User Management (7.13)

- Stored the signed-in user in the Redux store.  
- Enabled persistent login sessions and centralized authentication state.  

## Exercises 7.14–7.21: App Enhancements and Structure  

### Refactoring and Component Architecture

- Streamlined component logic to rely on Redux selectors and dispatchers.  
- Organized slices for **blogs**, **users**, and **notifications**.  

### User and Blog Views

- Added individual routes for blogs and users with dynamic parameters.  
- Integrated React Router to enable clean client-side navigation.  

### Additional Improvements

- Enhanced UX by ensuring updates reflect instantly across components.  
- Strengthened state consistency and eliminated redundant local states.  
