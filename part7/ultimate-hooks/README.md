# Ultimate Hooks  

## Overview  

This repository contains my solution for **Full Stack Open – Part 7**, exercise **7.8**, which focuses on creating a **universal data management hook** in React.  
The goal is to encapsulate backend communication logic into a single reusable hook, `useResource`, capable of handling multiple resource types—such as notes and persons—without duplicating code.  

The exercise demonstrates how to abstract RESTful API operations into a generic hook structure, combining modularity, scalability, and cleaner component design.  

## 7.8: Implementing the useResource Hook  

Starting from the base project provided at [fullstack-hy2020/ultimate-hooks](https://github.com/fullstack-hy2020/ultimate-hooks), the task is to refactor repetitive data-fetching and creation logic into a shared custom hook.  

### Core Implementation  

The `useResource` hook encapsulates:  

- Fetching all resources from a given base URL.  
- Creating new resources through POST requests.  
- Returning both the current data and an API interface for interacting with that data.  

The hook returns an array containing:

1. The current list of resources.
2. An object with service methods such as `create`.  

Example usage in `App.jsx`:  

```javascript
const [notes, noteService] = useResource('http://localhost:3005/notes')
const [persons, personService] = useResource('http://localhost:3005/persons')
```

Each service can be used independently for CRUD-like operations, enabling flexible and reusable resource management.

### Key Features

- Generic API handling: Works with any REST resource by changing the base URL.
- Reusability: The same hook supports both notes and persons collections.
- Declarative state updates: Automatically synchronizes data after resource creation.
Integration with other hooks: Seamlessly combines with useField for managing form inputs.

### Concepts Practiced

- Designing generic custom hooks for REST API communication
- Using axios and async/await with React state
- Managing asynchronous data and side effects
- Structuring hooks to return both data and operations (similar to React’s state hooks)
- Promoting scalability through reusable logic patterns