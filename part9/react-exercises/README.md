# react-exercises

## Overview  

This repository contains my solutions for **Full Stack Open – Part 9: TypeScript**, exercises **9.15–9.16**.  
These exercises focus on refactoring a simple React application using TypeScript to demonstrate component-based design, prop typing, and advanced TypeScript features like discriminated unions.  

## Exercises  

### 9.15: React Components with TypeScript  

Refactor a single-component React app into three components: **Header**, **Content**, and **Total**.  
Each component receives data via props with properly defined TypeScript types.  

**Concepts practiced:**  

- Creating and typing React components  
- Passing props between components  
- Using interfaces for prop validation  
- Basic project setup with Vite and TypeScript  

### 9.16: Advanced Typing and Discriminated Unions  

Enhance the course application by defining detailed types for different course parts.  

- Create shared interfaces and extend them with specific fields (e.g., `description`, `groupProjectCount`, `backgroundMaterial`).  
- Implement a `Part` component that uses **switch-based exhaustive type checking** to render each course part appropriately.  
- Add a new course part type (`special`) with `requirements` as a string array.  

**Concepts practiced:**  

- Extending interfaces with common fields  
- Discriminated union types  
- Exhaustive type checking with `never`  
- Conditional rendering based on type safety  
