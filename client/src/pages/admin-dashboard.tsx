import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Play, 
  Mail, 
  TrendingUp, 
  Download, 
  BarChart3, 
  Send, 
  Video,
  LogOut
} from "lucide-react";

interface DashboardStats {
  newsletterSubscribers: number;
  videoViews: number;
  messages: number;
  conversionRate: string;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [stats, setStats] = useState<DashboardStats>({
    newsletterSubscribers: 1247,
    videoViews: 3892,
    messages: 89,
    conversionRate: "24.5%"
  });

  const recentMessages = [
    {
      id: 1,
      name: "Mario Rossi",
      email: "mario.rossi@email.com",
      content: "Interessato alle strategie per affitti brevi a Venezia...",
      date: "2h fa"
    },
    {
      id: 2,
      name: "Giulia Bianchi",
      email: "giulia.bianchi@email.com",
      content: "Vorrei una consulenza per il mio immobile a Verona...",
      date: "5h fa"
    },
    {
      id: 3,
      name: "Andrea Ferrari",
      email: "andrea.ferrari@email.com",
      content: "Complimenti per il webinar, molto interessante...",
      date: "1g fa"
    }
  ];

  const handleLogout = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen hero-dark-bg" data-testid="page-admin-dashboard">
      {/* Dashboard Navigation */}
      <nav className="glass-effect border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img 
                src="https://i.imgur.com/aazwI7x.png" 
                alt="MoorentPM Logo" 
                className="h-10 w-auto mr-4"
                data-testid="img-dashboard-logo"
              />
              <h1 className="text-xl font-semibold text-white" data-testid="text-dashboard-title">
                Pannello Amministrativo
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300" data-testid="text-welcome-admin">Benvenuto, Admin</span>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-accent hover:text-white transition-colors"
                data-testid="button-logout"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="glass-effect border-white/10 text-white" data-testid="card-stats-newsletter">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="w-8 h-8 text-accent" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-300">Iscritti Newsletter</p>
                      <p className="text-2xl font-semibold text-white" data-testid="text-stats-newsletter">
                        {stats.newsletterSubscribers.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-white/10 text-white" data-testid="card-stats-video">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Play className="w-8 h-8 text-accent" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-300">Visualizzazioni Video</p>
                      <p className="text-2xl font-semibold text-white" data-testid="text-stats-video">
                        {stats.videoViews.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-white/10 text-white" data-testid="card-stats-messages">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Mail className="w-8 h-8 text-accent" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-300">Messaggi</p>
                      <p className="text-2xl font-semibold text-white" data-testid="text-stats-messages">
                        {stats.messages}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-white/10 text-white" data-testid="card-stats-conversions">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <TrendingUp className="w-8 h-8 text-accent" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-300">Conversioni</p>
                      <p className="text-2xl font-semibold text-white" data-testid="text-stats-conversions">
                        {stats.conversionRate}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-white/10 text-white" data-testid="card-recent-messages">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Messaggi Recenti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className="bg-white/5 rounded-lg p-4 border border-white/5"
                      data-testid={`message-${message.id}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-white font-medium" data-testid={`message-name-${message.id}`}>
                            {message.name}
                          </p>
                          <p className="text-gray-300 text-sm" data-testid={`message-email-${message.id}`}>
                            {message.email}
                          </p>
                          <p className="text-gray-300 mt-2 text-sm" data-testid={`message-content-${message.id}`}>
                            {message.content}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400" data-testid={`message-date-${message.id}`}>
                          {message.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="glass-effect border-white/10 text-white" data-testid="card-quick-actions">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Azioni Rapide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    className="w-full btn-primary hover-lift text-sm"
                    data-testid="button-export-subscribers"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Esporta Iscritti
                  </Button>
                  <Button 
                    variant="secondary"
                    className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 hover-lift text-sm"
                    data-testid="button-video-analytics"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics Video
                  </Button>
                  <Button 
                    variant="secondary"
                    className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 hover-lift text-sm"
                    data-testid="button-send-newsletter"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Invia Newsletter
                  </Button>
                  <Button 
                    variant="secondary"
                    className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 hover-lift text-sm"
                    data-testid="button-manage-webinar"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Gestisci Webinar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
