# Phonebook Application  

## Overview  
This repository contains my solutions for **Full Stack Open – Part 2: Communicating with Server**, exercises **2.6–2.18**.  
The Phonebook application is a CRUD-based React app that allows users to store, search, add, update, and delete contact information. Throughout these exercises, the application evolves from managing data locally to persisting it on a backend server using a RESTful API.

## Exercises  

### 2.6–2.10: Managing the Phonebook Locally  
The initial exercises focus on building a React application that manages a list of contacts in the browser.  
Users can add new contacts, prevent duplicates, and filter the displayed names based on a search query.

**Concepts practiced:**  
- Managing state with React hooks (`useState`)
- Handling form input and controlled components
- Conditional rendering
- Array manipulation (`map`, `filter`, `concat`)

### 2.11–2.14: Connecting to a Server  
The app is extended to fetch and store contact data on a server. Instead of using hardcoded data, it now communicates with a backend service via HTTP requests.

**Concepts practiced:**
- Fetching initial data with `useEffect`
- Using the `axios` library for HTTP requests
- Managing asynchronous state updates
- Extracting server interactions into a dedicated service module

### 2.15–2.18: Updating, Deleting, and Error Handling  
The final exercises add functionality to update and delete existing contacts, as well as handle errors gracefully when server requests fail (e.g., attempting to delete a contact that no longer exists on the server).

**Concepts practiced:**  
- Implementing full CRUD operations (Create, Read, Update, Delete)
- Building reusable service modules for API calls
- Error and success message handling with notifications
- Improving user experience through form validation and feedback 