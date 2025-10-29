# TypeScript Utilities and Express API  

## Overview  

This repository contains my solutions for **Full Stack Open – Part 9: TypeScript**, exercises **9.1–9.7**.  
These exercises introduce **TypeScript** fundamentals in a **Node.js** and **Express** environment. The progression covers setting up TypeScript, creating typed command-line utilities, and building RESTful endpoints with proper type safety and error handling.  

## Exercises  

### 9.1–9.3: BMI and Exercise Calculators  

The first part of the project focuses on building command-line utilities in TypeScript.  

#### **9.1 – Body Mass Index**  

A simple BMI calculator (`bmiCalculator.ts`) that takes height and weight, calculates the BMI, and returns a descriptive result.  

#### **9.2 – Exercise Calculator**  

An exercise statistics calculator (`exerciseCalculator.ts`) that computes average training hours, compares them against a target, and returns a structured result object including a success rating and message.  

#### **9.3 – Command Line Integration**  

Both calculators are updated to accept command-line arguments, allowing users to provide input directly when running the program. Input validation and error handling are implemented for malformed or missing parameters.  

**Concepts practiced:**  

- TypeScript basics and compiler configuration  
- Defining and enforcing custom types and interfaces  
- Parsing and validating command-line arguments  
- Handling errors and invalid inputs gracefully  

### 9.4–9.5: Express and Web Endpoints  

The next step involves setting up an **Express server** and exposing the calculators through HTTP endpoints.  

#### **9.4 – Express Setup**  

An Express server is initialized with TypeScript support and stricter compiler options. A basic `/hello` route is added to verify functionality.  

#### **9.5 – WebBMI**  

A `/bmi` GET endpoint is implemented to calculate BMI using query parameters (e.g., `?height=180&weight=72`). Responses include a BMI category or an appropriate error message for invalid inputs.  

**Concepts practiced:**

- Setting up and running a TypeScript + Express project  
- Using `ts-node-dev` for development  
- Accessing and validating query parameters  
- Structuring backend logic with reusable modules  

### 9.6–9.7: ESLint and Exercise API  

The final part focuses on improving code quality and expanding functionality.  

#### **9.6 – ESLint Configuration**  

ESLint is configured for the project using recommended TypeScript rules. All warnings and type issues are resolved for cleaner, more maintainable code.  

#### **9.7 – WebExercises**  

A new `/exercises` POST endpoint is added to process training data provided in JSON format. It validates input, calculates results using the earlier logic, and returns a detailed response object. Errors for missing or malformed parameters are handled explicitly.  

**Concepts practiced:**  

- Type-safe Express request handling  
- Validating and parsing JSON request bodies  
- Returning structured and meaningful API responses  
- Enforcing code quality with ESLint rules
