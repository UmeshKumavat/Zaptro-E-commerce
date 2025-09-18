import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import DataProvider from "./context/dataContext.jsx";
import CartProvider from "./context/CartContext.jsx";
import { LocationProvider } from "./context/LocationContext.jsx";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <DataProvider>
      <CartProvider>
        <LocationProvider>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <App />
            <ScrollToTop smooth color="white" style={{backgroundColor: "#fa2d37", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold"}} />
            <ToastContainer
              position="bottom-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              
            />
            {/* <Toaster position="bottom-right" reverseOrder={false} /> */}
          </ClerkProvider>
        </LocationProvider>
      </CartProvider>
    </DataProvider>
  // </StrictMode>
);
