import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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
  app.get("/api/newsletter/subscriptions", async (req, res) => {
    try {
      const subscriptions = await storage.getAllNewsletterSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
