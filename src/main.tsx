import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { PreferencesProvider } from "./utils/PreferencesContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <PreferencesProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </PreferencesProvider>
    </ErrorBoundary>
  </StrictMode>,
);
