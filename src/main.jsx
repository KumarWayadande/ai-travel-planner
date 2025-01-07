import { StrictMode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./custom/Header.jsx";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/create-trip", element: <CreateTrip /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);
