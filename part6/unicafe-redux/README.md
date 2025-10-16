# Unicafe Redux  

## Overview  

This repository contains my solutions for **Full Stack Open – Part 6**, exercises **6.1–6.2** focusing on using **Redux** to manage application state in a simple feedback app.  
The application allows users to log feedback as "good", "ok", or "bad". Instead of using local `useState` inside components, the application stores state centrally in a Redux store. :contentReference[oaicite:0]{index=0}

## Exercises  

### 6.1: Unicafe Revisited, Part 1  

Build a Redux reducer to track the number of each feedback type:

- Define the initial state with counters for `good`, `ok`, and `bad`.  
- Implement a reducer that handles the actions `GOOD`, `OK`, `BAD`, and `RESET`.  
- Write tests to ensure the reducer returns the correct state and remains immutable using **deep-freeze**.  

**Concepts practiced:**  

- Setting up a **Redux store** and **reducer** for global state  
- Using **action objects** to update state  
- Writing **pure functions** that produce new state without mutation  
- Testing reducers with **Vitest** and **deep-freeze**  
- Integrating Redux into a React application with **react-redux**  

### 6.2: Unicafe Revisited, Part 2  

Connect the Redux store to a React UI so that users can submit feedback and view counts:

- Replace local `useState` logic with Redux state.  
- Dispatch actions (`GOOD`, `OK`, `BAD`) from UI buttons to update the store.  
- Display feedback totals (good, ok, bad, total, and average) by selecting state from the store.  

**Concepts practiced:**  

- Using `useSelector` and `useDispatch` to connect Redux to React  
- Displaying state updates via Redux-managed data  
- Evaluating application behaviour based on global state  
