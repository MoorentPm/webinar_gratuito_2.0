import { Switch, Route, Router } from "wouter"; // 1. Importa il componente Router
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

// Ho rinominato la tua funzione originale "Router" in "AppRoutes"
// per evitare un conflitto di nomi con il componente Router di wouter.
function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    // La struttura corretta è avere i "Provider" all'esterno
    // e il Router che avvolge solo le rotte.
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router base="/webinar_gratuito">
          <AppRoutes />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
