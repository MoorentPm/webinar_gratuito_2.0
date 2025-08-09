import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.ts";
import { Toaster } from "./components/ui/toaster.tsx";
import { Router } from "wouter"; // MODIFICA: Importa il Router

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* MODIFICA: Aggiunto il Router con il percorso di base.
          Questa è la correzione fondamentale per la pagina bianca. */}
      <Router base={import.meta.env.BASE_URL}>
        <App />
      </Router>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
