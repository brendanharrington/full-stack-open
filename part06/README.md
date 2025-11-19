# Full Stack Open — Part 6  

This directory contains my solutions for **Part 6** of the [Full Stack Open](https://fullstackopen.com/en/) course by the University of Helsinki.  
Part 6 focuses on **Advanced State Management** in React applications, exploring different approaches to handle both local and global state effectively.

## unicafe-redux  

Implements a Redux-powered version of the Unicafe feedback app from Part 1.  
Users can leave feedback as "good", "ok", or "bad", and the counts for each are managed by a Redux store instead of React state.  

**Concepts practiced:**  

- Setting up and configuring a **Redux store**  
- Writing **pure reducers** to handle immutable state updates  
- Creating **action objects** for dispatching state changes  
- Using **deep-freeze** and **Vitest** to test reducers and ensure immutability  
- Connecting React components to the Redux store using the `useDispatch` and `useSelector` hooks  

## redux-anecdotes  

Implements a more advanced version of the Anecdotes application using **Redux Toolkit** for cleaner and more modern Redux patterns.  
This version introduces asynchronous data handling, filtering, and notifications, while connecting to a backend with `json-server`.  

**Concepts practiced:**  

- Using **Redux Toolkit**’s `createSlice` and `configureStore` to simplify reducer and action creation  
- Managing multiple slices of state (anecdotes, filters, notifications)  
- Implementing **asynchronous actions** with **Redux Thunk**  
- Integrating frontend with a backend using the **Fetch API**  
- Using **combined reducers** to manage complex application state  
- Displaying **notifications** for user actions such as voting and adding anecdotes  
- Implementing **filtering** and **sorting** logic within Redux  

## query-anecdotes  

Implements the final version of the Anecdotes app using **React Query** and **Context + useReducer** for managing data fetching and global notifications.  
The application retrieves anecdotes from a backend, allows users to vote or add new ones, and displays notifications or error messages accordingly.  

**Concepts practiced:**  

- Fetching and mutating server data with **React Query** (`useQuery`, `useMutation`)  
- Implementing **query invalidation** and **automatic cache updates** after mutations  
- Managing **global notifications** using **React Context** and **useReducer**  
- Handling **API errors** gracefully and displaying user-friendly error messages  
- Integrating **asynchronous UI updates** with data consistency ensured by React Query’s caching mechanisms  
- Building a fully reactive application with **minimal boilerplate**  
