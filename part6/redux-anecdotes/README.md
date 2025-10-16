# Redux Anecdotes  

## Overview  

This repository contains my solutions for **Full Stack Open – Part 6**, exercises **6.3–6.19**.  
The project implements a Redux-powered Anecdotes application that allows users to view, vote for, add, and filter anecdotes. Later exercises connect the app to a backend using **JSON Server** and add asynchronous actions with **Redux Thunk**, as well as a notification system for user feedback.

## Exercises  

### 6.3–6.8: Basic Anecdotes Functionality  

Implement the basic anecdote voting and creation functionality using Redux.

**Concepts practiced:**  

- Storing anecdotes and votes in a Redux store  
- Dispatching actions to vote and add anecdotes  
- Sorting anecdotes by vote count  
- Separating logic into components: `AnecdoteList` and `AnecdoteForm`  
- Testing reducers and state updates  

### 6.9–6.13: Filtering, Redux Toolkit, and Notifications  

Enhance the app with filtering, notifications, and modern Redux patterns.

**Concepts practiced:**  

- Adding a filter slice to show only anecdotes that match a search string  
- Using `combineReducers` to manage multiple slices of state  
- Refactoring reducers with **Redux Toolkit** (`createSlice` and `configureStore`)  
- Creating a notification system to show messages when anecdotes are voted or added  
- Auto-clearing notifications after a set duration  

### 6.14–6.19: Anecdotes and the Backend  

Connect the Redux app to a backend using JSON Server and implement asynchronous operations.

**Concepts practiced:**  

- Fetching initial anecdotes from the backend (**6.14**)  
- Adding new anecdotes to the backend (**6.15–6.17**)  
- Voting on anecdotes and persisting votes to the backend (**6.18**)  
- Implementing notifications with duration (**6.19**)  
- Using **Redux Thunk** to handle asynchronous actions and side effects  
- Keeping frontend and backend state in sync  
