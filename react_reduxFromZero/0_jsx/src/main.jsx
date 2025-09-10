// THIS IS THE FIRST FILE WHICH WILL GET EXECUTED WHEN PROJECT STARTS.
// CREATING A COMPONENT AND DISPLAYING ON THE SCREEN IS 5 STEPS PROCESS.

// 1-)IMPORT THE REACT AND REACTDOM LIBRARIES.

//Library that defines what a component is and how components work together
import React from "react";

//Library that knows how to get a component to show up in browswer.
import ReactDOM from "react-dom/client";

// 2-) Get a reference to the div with ID root
const el = document.getElementById("root");

// 3-) Tell React to take control of that element
const root = ReactDOM.createRoot(el);

// 4-) Create a component
// The import statement should be on the top(Good Practice)
import App from "./App";

// 5-) Show the component on the screen
root.render(<App />);
