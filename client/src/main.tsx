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
      {/* MODIFICA FINALE E CRUCIALE:
        Aggiungiamo il componente <Router> di wouter e gli passiamo la prop 'base'.
        'import.meta.env.BASE_URL' è una variabile speciale fornita da Vite che 
        contiene il valore '/webinar_gratuito_2.0/' che abbiamo impostato nel file vite.config.ts.
        Questo dice all'applicazione come interpretare gli URL sulla pagina pubblicata,
        risolvendo il problema della schermata bianca.
      */}
      <Router base={import.meta.env.BASE_URL}>
        <App />
      </Router>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
