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
        {/* L'animazione rimane fuori, come sfondo per tutto */}
        <WavesBackground />
        
        {/* Questo div diventa il contenitore principale della tua app */}
        <div className="relative z-10 text-foreground">
          <Toaster />
          <Router base="/webinar_gratuito_2.0">
            <AppRoutes />
          </Router>
        </div>

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
