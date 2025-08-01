import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").default(sql`now()`).notNull(),
  status: varchar("status", { length: 20 }).default("active").notNull(), // active, unsubscribed
  source: varchar("source", { length: 50 }).default("website").notNull(),
});

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  name: text("name"),
  phone: text("phone"),
  message: text("message"),
  source: varchar("source", { length: 50 }).notNull(), // webinar, whatsapp, phone, linktree
  status: varchar("status", { length: 20 }).default("new").notNull(), // new, contacted, qualified, converted, closed
  notes: text("notes"),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
  contactedAt: timestamp("contacted_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletterSubscriptions).pick({
  email: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
});

export const insertLeadSchema = createInsertSchema(leads).pick({
  email: true,
  name: true,
  phone: true,
  message: true,
  source: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  source: z.enum(["webinar", "whatsapp", "phone", "linktree", "website"]),
});

export const updateLeadSchema = createInsertSchema(leads).pick({
  status: true,
  notes: true,
  contactedAt: true,
}).extend({
  status: z.enum(["new", "contacted", "qualified", "converted", "closed"]),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type UpdateLead = z.infer<typeof updateLeadSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
