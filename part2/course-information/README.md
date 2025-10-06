# Course Information Application (Part 2)

## Overview  
This repository contains my solutions for **Full Stack Open – Part 2: Communicating with Server**, exercises **2.1–2.5**.  
These exercises expand on the Part 1 Course Information application by introducing more advanced React concepts, including modular component structure, props validation, and managing data stored on a server.

## Exercises  

### 2.1–2.3: Refactoring the Course Component  
The application is refactored to display information for multiple courses using reusable components. Each course includes its name, parts, and total exercises, rendered dynamically from data passed as props.

**Concepts practiced:**  
- Rendering nested components  
- Working with arrays of objects  
- Using the `map()` function to dynamically create lists  
- Structuring React components for scalability  

### 2.4: Extracting Components  
The application is further decomposed to improve maintainability. Components such as `Course`, `Header`, `Content`, and `Total` are made modular and reusable for handling multiple course objects.

**Concepts practiced:**  
- Component composition and reusability  
- Prop drilling and data organization  
- Keeping components small and focused  

### 2.5: Displaying Multiple Courses  
The final exercise adapts the app to handle **multiple courses** simultaneously, with each course rendered from data in an array of course objects. Each course displays its own list of parts and exercise totals.

**Concepts practiced:**  
- Managing complex data structures in React  
- Dynamic rendering of multiple data groups  
- Passing arrays and objects as props 