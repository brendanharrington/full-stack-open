# Full Stack Open — Part 7  

This directory contains my solutions for **Part 7** of the [Full Stack Open](https://fullstackopen.com/en/) course by the University of Helsinki.  
Part 7 expands on the **Bloglist** application from previous sections and focuses on **advanced React techniques**, **state management with Redux and React Query**, and **application architecture improvements**.  

The exercises explore how to structure larger applications, manage global and server-side state efficiently, and ensure clean, maintainable code through modularization and automated formatting tools.

## routed-anecdotes  

Introduces **React Router** for single-page application navigation.  
The Anecdotes app is extended to include multiple routes — such as lists, details, and creation forms — while maintaining client-side routing without page reloads.  

**Concepts practiced:**  

- Setting up **React Router** with nested and dynamic routes  
- Using `useParams` and `useNavigate` for accessing route parameters and programmatic navigation  
- Handling form submissions and navigation redirects  
- Structuring a **multi-view React application** cleanly  

## country-hook  

Builds a custom **React hook** (`useCountry`) to fetch country data from an external REST API.  
The hook encapsulates side effects with `useEffect` and returns structured state (data, loading, and error) for simple consumption by components.  

**Concepts practiced:**  

- Writing and reusing **custom React hooks**
- Using **`useEffect` dependency arrays** effectively to control API calls  
- Separating data-fetching logic from component UI  
- Managing asynchronous effects and conditional rendering  

## ultimate-hooks  

Extracts generic backend communication into a reusable **useResource** hook that can manage any REST resource.  
This hook centralizes fetching and creating resources and returns both the current resource list and a service object for manipulating the resource collection (e.g., `create`). The implementation lets components consume resources similarly to `useState` while keeping API logic encapsulated and reusable across multiple resource types (notes, persons, blogs, etc.).  

**Concepts practiced:**  

- Designing **generic custom hooks** for REST API communication  
- Returning `[resources, service]` to mirror React state patterns for easy consumption  
- Using `axios` with async/await inside hooks and synchronizing local state with server responses  
- Combining composable hooks (`useField` + `useResource`) for clean component code  
- Promoting reusability and reducing duplication across features  

## bloglist-redux  

Implements the Bloglist application using **Redux Toolkit** for state management.  
All major pieces of application state — including blogs, users, and notifications — are centralized in the Redux store to create a predictable data flow.  

**Concepts practiced:**  

- Managing global state with **Redux Toolkit slices**
- Using `useDispatch` and `useSelector` to interact with the Redux store  
- Implementing **async thunks** for backend communication  
- Managing **notifications** and **authentication state** globally  
- Structuring Redux logic for scalability and readability  
- Integrating **Prettier** for automatic code formatting  

## bloglist-query  

Implements the same Bloglist app using **React Query** combined with **Context** and **useReducer** instead of Redux.  
React Query handles asynchronous server data while Context manages global client-side state like notifications and user data.  

**Concepts practiced:**

- Fetching, caching, and updating data using **React Query** (`useQuery`, `useMutation`)
- Managing side effects and invalidation efficiently  
- Implementing **global state** with Context and useReducer  
- Handling **loading** and **error** states gracefully  
- Structuring applications that combine **server and client state** seamlessly  
