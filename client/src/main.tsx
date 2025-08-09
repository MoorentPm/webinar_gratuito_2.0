import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.ts";
import { Toaster } from "./components/ui/toaster.tsx";
import { Router } from "wouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* MODIFICA: Aggiunto il prop 'base' al componente Router.
        Questo dice a wouter di usare il percorso di base definito nella configurazione di Vite 
        (nel tuo caso '/webinar_gratuito_2.0/'). 
        'import.meta.env.BASE_URL' è una variabile speciale di Vite che contiene 
        automaticamente il valore corretto.
      */}
      <Router base={import.meta.env.BASE_URL}>
        <App />
      </Router>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
