import { type User, type InsertUser, type NewsletterSubscription, type InsertNewsletterSubscription, type Lead, type InsertLead, type UpdateLead } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Newsletter subscription methods
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined>;
  getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  
  // Lead management methods
  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
  getLeadById(id: string): Promise<Lead | undefined>;
  updateLead(id: string, updates: Partial<UpdateLead>): Promise<Lead>;
  getLeadsByStatus(status: string): Promise<Lead[]>;
  getLeadsBySource(source: string): Promise<Lead[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private newsletterSubscriptions: Map<string, NewsletterSubscription>;
  private leads: Map<string, Lead>;

  constructor() {
    this.users = new Map();
    this.newsletterSubscriptions = new Map();
    this.leads = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      isAdmin: false,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = randomUUID();
    const newsletterSubscription: NewsletterSubscription = {
      ...subscription,
      id,
      subscribedAt: new Date(),
      status: "active",
      source: "website",
    };
    this.newsletterSubscriptions.set(id, newsletterSubscription);
    return newsletterSubscription;
  }

  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    return Array.from(this.newsletterSubscriptions.values()).find(
      (subscription) => subscription.email === email,
    );
  }

  async getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptions.values());
  }

  // Lead management methods
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = {
      id,
      email: insertLead.email,
      name: insertLead.name || null,
      phone: insertLead.phone || null,
      message: insertLead.message || null,
      source: insertLead.source,
      status: "new",
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      contactedAt: null,
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getLeadById(id: string): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async updateLead(id: string, updates: Partial<UpdateLead>): Promise<Lead> {
    const existingLead = this.leads.get(id);
    if (!existingLead) {
      throw new Error(`Lead with id ${id} not found`);
    }

    const updatedLead: Lead = {
      ...existingLead,
      ...updates,
      updatedAt: new Date(),
    };

    this.leads.set(id, updatedLead);
    return updatedLead;
  }

  async getLeadsByStatus(status: string): Promise<Lead[]> {
    return Array.from(this.leads.values()).filter(lead => lead.status === status);
  }

  async getLeadsBySource(source: string): Promise<Lead[]> {
    return Array.from(this.leads.values()).filter(lead => lead.source === source);
  }
}

export const storage = new MemStorage();
