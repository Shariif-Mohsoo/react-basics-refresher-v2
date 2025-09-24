import React from "react";
import { createRoot } from "react-dom/client";

import { NavigationProvider } from "./context/navigation";

import App from "./App";

const el = document.getElementById("root");
const root = createRoot(el);

root.render(
  <NavigationProvider>
    <App />
  </NavigationProvider>
);
