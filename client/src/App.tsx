import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import WavesBackground from "@/components/WavesBackground";

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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* L'animazione rimane qui, come sfondo per tutto */}
        <WavesBackground />
        
        {/* Il Toaster e il Router sono gli unici altri elementi a questo livello */}
        <Toaster />
        <Router base="/webinar_gratuito_2.0">
          <AppRoutes />
        </Router>

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
