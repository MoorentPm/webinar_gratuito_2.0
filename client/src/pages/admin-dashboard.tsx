import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { 
  Users, 
  Mail, 
  Phone, 
  MessageSquare, 
  BarChart3, 
  Calendar, 
  Filter, 
  Search, 
  Eye, 
  Edit, 
  LogOut,
  Shield,
  RefreshCw,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type Lead, updateLeadSchema } from "@shared/schema";

// Helper function to format dates
const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleString('it-IT', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    new: { label: "Nuovo", variant: "secondary" as const, icon: AlertCircle },
    contacted: { label: "Contattato", variant: "default" as const, icon: Phone },
    qualified: { label: "Qualificato", variant: "default" as const, icon: TrendingUp },
    converted: { label: "Convertito", variant: "default" as const, icon: CheckCircle },
    closed: { label: "Chiuso", variant: "outline" as const, icon: Clock }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};

// Source badge component
const SourceBadge = ({ source }: { source: string }) => {
  const sourceConfig = {
    webinar: { label: "Webinar", color: "bg-blue-100 text-blue-800" },
    whatsapp: { label: "WhatsApp", color: "bg-green-100 text-green-800" },
    phone: { label: "Telefono", color: "bg-purple-100 text-purple-800" },
    linktree: { label: "LinkTree", color: "bg-pink-100 text-pink-800" },
    website: { label: "Sito Web", color: "bg-gray-100 text-gray-800" }
  };

  const config = sourceConfig[source as keyof typeof sourceConfig] || sourceConfig.website;

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");

  // Check admin authentication
  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["/api/admin/me"],
    retry: false,
  });

  // Fetch leads
  const { data: leads = [], isLoading: leadsLoading, refetch: refetchLeads } = useQuery({
    queryKey: ["/api/leads"],
    enabled: !!user?.isAdmin,
  });

  // Fetch newsletter subscriptions for stats
  const { data: newsletters = [] } = useQuery({
    queryKey: ["/api/newsletter/subscriptions"],
    enabled: !!user?.isAdmin,
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("/api/admin/logout", { method: "POST" });
    },
    onSuccess: () => {
      queryClient.clear();
      setLocation("/admin/login");
      toast({
        title: "Logout successful",
        description: "You have been logged out successfully.",
      });
    },
  });

  // Update lead mutation
  const updateLeadMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      return await apiRequest(`/api/leads/${id}`, {
        method: "PATCH",
        body: updates,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      setIsEditDialogOpen(false);
      setSelectedLead(null);
      toast({
        title: "Lead updated",
        description: "Lead information has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!userLoading && (userError || !user?.isAdmin)) {
      setLocation("/admin/login");
    }
  }, [user, userLoading, userError, setLocation]);

  // Filter leads
  const filteredLeads = leads.filter((lead: Lead) => {
    const matchesSearch = !searchTerm || 
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  // Calculate stats
  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter((l: Lead) => l.status === "new").length,
    convertedLeads: leads.filter((l: Lead) => l.status === "converted").length,
    newsletterSubscribers: newsletters.length,
  };

  const conversionRate = stats.totalLeads > 0 ? (stats.convertedLeads / stats.totalLeads * 100).toFixed(1) : "0";

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setEditNotes(lead.notes || "");
    setEditStatus(lead.status);
    setIsEditDialogOpen(true);
  };

  const handleUpdateLead = () => {
    if (!selectedLead) return;

    const updates: any = {
      status: editStatus,
      notes: editNotes || null,
    };

    if (editStatus === "contacted" && selectedLead.status === "new") {
      updates.contactedAt = new Date().toISOString();
    }

    updateLeadMutation.mutate({ id: selectedLead.id, updates });
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">MoorentPM Admin</h1>
                <p className="text-sm text-gray-600">Lead Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.username}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalLeads}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Leads</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.newLeads}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversions</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.convertedLeads}</p>
                  <p className="text-sm text-gray-500">{conversionRate}% rate</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Newsletter</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.newsletterSubscribers}</p>
                </div>
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Lead Management</CardTitle>
            <CardDescription>Manage and track all your leads in one place</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by email, name, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="linktree">LinkTree</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => refetchLeads()}
                disabled={leadsLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${leadsLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            {/* Leads Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        {leadsLoading ? "Loading leads..." : "No leads found"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead: Lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{lead.name || "No name"}</p>
                            <p className="text-sm text-gray-600">{lead.email}</p>
                            {lead.phone && (
                              <p className="text-sm text-gray-600">{lead.phone}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <SourceBadge source={lead.source} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={lead.status} />
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {formatDate(lead.createdAt)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {lead.contactedAt ? formatDate(lead.contactedAt) : "Not contacted"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditLead(lead)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Edit Lead Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
            <DialogDescription>
              Update the status and notes for this lead.
            </DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Contact Information</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="font-medium">{selectedLead.name || "No name"}</p>
                  <p className="text-sm text-gray-600">{selectedLead.email}</p>
                  {selectedLead.phone && (
                    <p className="text-sm text-gray-600">{selectedLead.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Add notes about this lead..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateLead}
                  disabled={updateLeadMutation.isPending}
                >
                  {updateLeadMutation.isPending ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}