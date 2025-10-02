import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";

if (process.env.NODE_ENV !== "development") {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
