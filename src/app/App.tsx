import "./App.css";
import "@/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./providers/router";
import { QueryProvider } from "./providers/query";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  </React.StrictMode>
);
