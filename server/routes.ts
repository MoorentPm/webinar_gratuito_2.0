import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const subscriber = await storage.addNewsletterSubscriber(email);
      res.json({ message: "Successfully subscribed to newsletter", subscriber });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ message: "Name, email, and message are required" });
      }

      const contact = await storage.addContactMessage({
        name,
        email,
        phone,
        message
      });
      
      res.json({ message: "Message sent successfully", contact });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });



  const httpServer = createServer(app);
  return httpServer;
}
