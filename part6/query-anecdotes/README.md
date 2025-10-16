# Query Anecdotes  

## Overview  

This repository contains my solutions for **Full Stack Open – Part 6**, exercises **6.20–6.24**, where the anecdotes application is refactored to use **React Query** and **Context + useReducer**.  
The backend is managed via `json-server`, and the frontend fetches, updates, and synchronizes data using React Query, while notifications are handled globally through Context. :contentReference[oaicite:2]{index=2}

## Exercises  

### 6.20–6.22: React Query Data Management  

Refactor the app to use **React Query** for managing server data:

- Use `useQuery` to fetch anecdotes from the backend.  
- Handle loading and error states for server communication.  
- Use `useMutation` for creating new anecdotes and voting.  
- Invalidate queries to keep data synchronized after mutations.  

**Concepts practiced:**  

- Using `useQuery` and `useMutation` hooks  
- Handling query invalidation and automatic cache updates  
- Managing asynchronous server communication  
- Testing error states and retry logic

### 6.23–6.24: Notifications and Error Handling  

Implement a global notification system with **Context + useReducer** and display errors:

- Show notifications when a new anecdote is added or voted.  
- Automatically clear notifications after 5 seconds.  
- Display error messages when backend requests fail (e.g., API rejects short anecdotes).  

**Concepts practiced:**  

- Setting up global state with **Context API** and `useReducer`  
- Dispatching actions for notifications  
- Error handling in asynchronous UI logic  
