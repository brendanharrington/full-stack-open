# Countries Application  

## Overview  
This repository contains my solutions for **Full Stack Open – Part 2: Communicating with Server**, exercises **2.18–2.20**.  
The Countries application is a React app that allows users to search for countries and view detailed information about them.  
Throughout these exercises, the app evolves from showing basic country data to integrating interactivity with buttons and fetching weather information for capitals via an external API.

## Exercises  

### 2.18: Data for Countries, Step 1  
The initial exercise builds a simple search interface where users can type a query to find countries.  
- If more than 10 countries match, the app prompts the user to narrow their search.  
- If 10 or fewer countries match, their names are displayed in a list.  
- If only one country matches, detailed information is shown, including capital, area, flag, and languages.

**Concepts practiced:**  
- React state management with `useState`  
- Conditional rendering based on query results  
- Rendering lists dynamically  
- Controlled input components

### 2.19: Data for Countries, Step 2  
The app is enhanced to include a **“show” button** next to each country name in the list.  
Clicking the button displays the detailed view for that country, making it easier to explore multiple countries without typing their full names.

**Concepts practiced:**  
- Event handling with buttons and props  
- Updating state in response to user actions  
- Component communication (passing handlers down as props)  
- Dynamic conditional rendering of single-country views

### 2.20: Data for Countries, Step 3  
The final exercise adds **weather information** for the capital city of a country using an external API, such as OpenWeatherMap.  
- API keys are stored as environment variables (`VITE_SOME_KEY`) to avoid exposing sensitive data.  
- The app fetches and displays temperature, weather description, and icons dynamically.  
- Users see a complete view combining country details and real-time weather for the capital.

**Concepts practiced:**  
- Fetching data from external APIs with `axios` and `useEffect`  
- Handling asynchronous API requests  
- Securely using environment variables in a frontend project  
- Integrating multiple data sources into a single UI
