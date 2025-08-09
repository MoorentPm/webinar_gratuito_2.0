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



export interface IStorage {
  addNewsletterSubscriber(email: string): Promise<NewsletterSubscriber>;
  addContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private newsletterSubscribers: Map<string, NewsletterSubscriber>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.newsletterSubscribers = new Map();
    this.contactMessages = new Map();
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
}

export const storage = new MemStorage();
