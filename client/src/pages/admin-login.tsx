import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogIn, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate authentication check
      if (formData.email === "admin@moorentpm.it" && formData.password === "admin123") {
        toast({
          title: "Accesso effettuato",
          description: "Benvenuto nel pannello amministrativo",
        });
        setLocation("/admin/dashboard");
      } else {
        toast({
          title: "Errore di accesso",
          description: "Email o password non corretti",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'accesso",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center hero-dark-bg px-4" data-testid="page-admin-login">
      <div className="max-w-md w-full">
        <Card className="glass-effect border-white/10 text-white">
          <CardHeader className="text-center space-y-4">
            <img 
              src="https://i.imgur.com/aazwI7x.png" 
              alt="MoorentPM Logo" 
              className="h-12 w-auto mx-auto"
              data-testid="img-admin-logo"
            />
            <div>
              <CardTitle className="text-2xl font-semibold text-white" data-testid="text-admin-title">
                Accesso Amministratore
              </CardTitle>
              <CardDescription className="text-gray-300 mt-2" data-testid="text-admin-description">
                Inserisci le tue credenziali per accedere al pannello amministrativo
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-admin-login">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@moorentpm.it"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-accent"
                  data-testid="input-admin-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-accent"
                  data-testid="input-admin-password"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full btn-primary hover-lift"
                disabled={isLoading}
                data-testid="button-admin-login"
              >
                <LogIn className="w-4 h-4 mr-2" />
                {isLoading ? "Accesso in corso..." : "Accedi"}
              </Button>
            </form>
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setLocation("/")}
                className="text-accent hover:text-white transition-colors text-sm"
                data-testid="button-back-home"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Torna alla Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
