import { randomUUID } from "crypto";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: Date;
}

export interface Stats {
  newsletterSubscribers: number;
  videoViews: number;
  messages: number;
  conversionRate: string;
}

export interface IStorage {
  addNewsletterSubscriber(email: string): Promise<NewsletterSubscriber>;
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  addContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  getStats(): Promise<Stats>;
}

export class MemStorage implements IStorage {
  private newsletterSubscribers: Map<string, NewsletterSubscriber>;
  private contactMessages: Map<string, ContactMessage>;
  private videoViews: number;

  constructor() {
    this.newsletterSubscribers = new Map();
    this.contactMessages = new Map();
    this.videoViews = 3892;

    // Add some initial data for demo
    this.addContactMessage({
      name: "Mario Rossi",
      email: "mario.rossi@email.com",
      message: "Interessato alle strategie per affitti brevi a Venezia..."
    });
    
    this.addContactMessage({
      name: "Giulia Bianchi", 
      email: "giulia.bianchi@email.com",
      message: "Vorrei una consulenza per il mio immobile a Verona..."
    });

    this.addContactMessage({
      name: "Andrea Ferrari",
      email: "andrea.ferrari@email.com", 
      message: "Complimenti per il webinar, molto interessante..."
    });
  }

  async addNewsletterSubscriber(email: string): Promise<NewsletterSubscriber> {
    const id = randomUUID();
    const subscriber: NewsletterSubscriber = {
      id,
      email,
      subscribedAt: new Date()
    };
    this.newsletterSubscribers.set(id, subscriber);
    return subscriber;
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return Array.from(this.newsletterSubscribers.values());
  }

  async addContactMessage(messageData: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...messageData,
      id,
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getStats(): Promise<Stats> {
    return {
      newsletterSubscribers: this.newsletterSubscribers.size,
      videoViews: this.videoViews,
      messages: this.contactMessages.size,
      conversionRate: "24.5%"
    };
  }
}

export const storage = new MemStorage();
