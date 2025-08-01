import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { storage } from "./storage";
import { insertNewsletterSchema, insertLeadSchema, updateLeadSchema, loginSchema } from "@shared/schema";
import { z } from "zod";

// Extend the session interface to include userId and isAdmin
declare module "express-session" {
  interface SessionData {
    userId?: string;
    isAdmin?: boolean;
  }
}

// Authentication middleware
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};

// Admin authentication middleware
const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId || !req.session.isAdmin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'moorentpm-admin-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));
  // Newsletter subscription endpoint
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getNewsletterSubscriptionByEmail(validatedData.email);
      if (existingSubscription) {
        return res.status(409).json({ message: "Email already subscribed to newsletter" });
      }
      
      const subscription = await storage.createNewsletterSubscription(validatedData);
      res.status(201).json({ 
        message: "Successfully subscribed to newsletter",
        subscription: { id: subscription.id, email: subscription.email }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid email format",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all newsletter subscriptions (admin endpoint)
  app.get("/api/newsletter/subscriptions", requireAdmin, async (req, res) => {
    try {
      const subscriptions = await storage.getAllNewsletterSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin Authentication Endpoints
  app.post("/api/admin/login", async (req, res) => {
    try {
      const credentials = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(credentials.username);
      if (!user || user.password !== credentials.password || !user.isAdmin) {
        return res.status(401).json({ message: "Invalid credentials or insufficient permissions" });
      }

      req.session.userId = user.id;
      req.session.isAdmin = user.isAdmin;
      
      res.json({ 
        message: "Login successful",
        user: { id: user.id, username: user.username, isAdmin: user.isAdmin }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/admin/logout", requireAuth, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  app.get("/api/admin/me", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ 
        id: user.id, 
        username: user.username, 
        isAdmin: user.isAdmin 
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Lead Management Endpoints
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.status(201).json({ 
        message: "Lead created successfully",
        lead 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/leads", requireAdmin, async (req, res) => {
    try {
      const { status, source } = req.query;
      
      let leads;
      if (status) {
        leads = await storage.getLeadsByStatus(status as string);
      } else if (source) {
        leads = await storage.getLeadsBySource(source as string);
      } else {
        leads = await storage.getAllLeads();
      }
      
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/leads/:id", requireAdmin, async (req, res) => {
    try {
      const lead = await storage.getLeadById(req.params.id);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/leads/:id", requireAdmin, async (req, res) => {
    try {
      const updates = updateLeadSchema.parse(req.body);
      const updatedLead = await storage.updateLead(req.params.id, updates);
      res.json({ 
        message: "Lead updated successfully",
        lead: updatedLead 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input",
          errors: error.errors 
        });
      }
      if (error instanceof Error && error.message.includes("not found")) {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
