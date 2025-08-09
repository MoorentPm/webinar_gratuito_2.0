import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.ts";
import { Toaster } from "./components/ui/toaster.tsx";
// MODIFICA: Importa il componente Router
import { Router } from "wouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* MODIFICA: Avvolge l'intera App nel Router e imposta il "base path".
          Questa è la correzione essenziale per far funzionare il sito su GitHub Pages. */}
      <Router base={import.meta.env.BASE_URL}>
        <App />
      </Router>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
