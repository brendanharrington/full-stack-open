# Playwright Tests  

## Overview  

This repository contains my solutions for **Full Stack Open – Part 5: Testing React Apps**, exercises **5.13–5.23**, focusing on **unit, integration, and end-to-end tests** using **React Testing Library** and **Playwright**.  
Tests verify frontend components, user interactions, and full application workflows.

## Exercises  

### 5.13–5.16: Component Tests  

Write tests for the Blog and New Blog components to ensure they render correctly, show/hide details, and handle events.

**Concepts practiced:**  

- Using React Testing Library for unit and integration tests  
- Verifying rendering of blog titles, authors, URLs, and likes  
- Simulating clicks and form submissions  
- Ensuring event handlers are called with correct arguments  

### 5.17–5.18: End-to-End Setup and Login Tests  

Set up Playwright for end-to-end testing and write tests to verify login functionality, including both successful and failed logins.

**Concepts practiced:**  

- Setting up Playwright with a separate npm project  
- Automating browser interactions and page navigation  
- Testing login flows with frontend-backend integration  
- Resetting backend state before each test  

### 5.19–5.21: Blog Creation, Likes, and Deletion  

Write tests to verify that a logged-in user can create blogs, like blogs, and delete their own blogs.

**Concepts practiced:**  

- Creating and interacting with UI elements programmatically  
- Validating that new blogs appear in the blog list  
- Testing like button functionality and blog deletion  
- Handling window.confirm dialogs in Playwright tests  

### 5.22–5.23: User-Specific Access and Sorting  

Test that only the user who added a blog sees the delete button, and ensure blogs are sorted by likes in descending order.

**Concepts practiced:**  

- Conditional rendering verification in end-to-end tests  
- Sorting validation in UI tests  
- Ensuring proper authorization and data visibility
