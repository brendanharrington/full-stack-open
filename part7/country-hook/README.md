# Country Hook  

## Overview  

This repository contains my solution for **Full Stack Open – Part 7**, exercise **7.7**, which revisits the country data application from Part 2.  
The goal of this exercise is to implement a **custom React hook** named `useCountry` that fetches and manages data for a given country using the REST Countries API.  
This enhances code modularity by separating data-fetching logic from component rendering, leading to cleaner and more reusable components.  

## 7.7: Implementing the useCountry Hook  

Starting from the base project provided at [fullstack-hy2020/country-hook](https://github.com/fullstack-hy2020/country-hook), the application allows users to search for countries and view their details using data from the endpoint:  

`https://studies.cs.helsinki.fi/restcountries/`

When a valid country name is entered, the app displays information such as the capital, population, and flag.  
If the search does not match any country, the app displays a “country not found” message.  

The task focuses on creating and integrating the `useCountry` custom hook:  

- Implement `useCountry(name)` to fetch and store country details from the API.  
- Use the `useEffect` hook to trigger the fetch operation when the `name` parameter changes.  
- Return structured data from the hook, including both the fetched country details and a status indicator (e.g., found or not found).  
- Manage loading states and handle invalid responses gracefully.  

**Concepts practiced:**  

- Creating **custom data-fetching hooks** in React  
- Using **useEffect** dependencies to control side effects  
- Structuring and returning data for reusability  
- Handling asynchronous state updates and conditional rendering  
