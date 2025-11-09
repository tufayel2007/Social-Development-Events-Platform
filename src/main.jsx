// src/main.jsx  অথবা  src/index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import Routers from "./Routers/Routers";

// এই দুইটা লাইন যোগ করো
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* QueryClientProvider দিয়ে সবকিছু wrap করো */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Routers} />
    </QueryClientProvider>
  </StrictMode>
);
