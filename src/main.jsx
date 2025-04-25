import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./custom/Header.jsx";
import Viewtrip from "./view-trip/[tripId]/index.jsx";
import MyTrips from "./my-trips/index.jsx";
import UserContextProvider from "./context-api/context-handler.jsx";
// import Footer from "./view-trip/components/Footer.jsx";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "create-trip", element: <CreateTrip /> },
  { path: "my-trips", element: <MyTrips /> },
  { path: "view-trip/:tripId", element: <Viewtrip /> },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <UserContextProvider>
      <Header />
      <RouterProvider router={router} />
      <Toaster />
    </UserContextProvider>
  </GoogleOAuthProvider>
  // </StrictMode>
);
