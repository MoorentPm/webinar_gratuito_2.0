import { type User, type InsertUser, type NewsletterSubscription, type InsertNewsletterSubscription } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Newsletter subscription methods
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined>;
  getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private newsletterSubscriptions: Map<string, NewsletterSubscription>;

  constructor() {
    this.users = new Map();
    this.newsletterSubscriptions = new Map();
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = randomUUID();
    const newsletterSubscription: NewsletterSubscription = {
      ...subscription,
      id,
      subscribedAt: new Date(),
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
}

export const storage = new MemStorage();
