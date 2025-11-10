// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import Routers from "./Routers/Routers";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Theme Provider
import { ThemeProvider } from "./context/ThemeContext"; // এই পাথ ঠিক রাখো

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* প্রথমে ThemeProvider, তারপর QueryClientProvider */}
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Routers} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
