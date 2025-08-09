# Overview

This is a webinar landing page application built with React and Express.js. The application is designed to capture leads for a premium real estate webinar focused on short-term rental strategies in the Triveneto region of Italy. It features a modern, responsive design with animated backgrounds, video integration, and form handling for newsletter subscriptions and contact inquiries.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for the client-side application
- **Vite** as the build tool and development server
- **Wouter** for client-side routing instead of React Router
- **TanStack React Query** for server state management and API calls
- **Tailwind CSS** with custom design system for styling
- **shadcn/ui** component library built on Radix UI primitives
- **Custom animated background** using Canvas API for visual appeal

## Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** endpoints for newsletter subscriptions and contact forms
- **In-memory storage** implementation with interface for future database integration
- **Development middleware** for request logging and error handling

## Component Structure
- **Single page application** with Home page and 404 fallback
- **Reusable UI components** from shadcn/ui library
- **Form handling** with React Hook Form and Zod validation
- **Toast notifications** for user feedback
- **Mobile-responsive design** with hamburger menu navigation

## Data Management
- **Type-safe interfaces** for NewsletterSubscriber and ContactMessage entities
- **Zod schemas** for runtime validation of form inputs
- **Storage abstraction layer** allowing easy migration from memory to database

## Development Tools
- **ESBuild** for production server bundling
- **TypeScript** for type safety across the entire stack
- **Path aliases** for clean import statements
- **Hot module replacement** in development via Vite



# External Dependencies

## UI and Styling
- **@radix-ui/react-*** - Headless UI primitives for accessible components
- **tailwindcss** - Utility-first CSS framework
- **class-variance-authority** - Utility for creating component variants
- **lucide-react** - Icon library for consistent iconography

## Database and ORM
- **drizzle-orm** - TypeScript ORM for database operations
- **drizzle-kit** - CLI tool for database migrations and schema management
- **@neondatabase/serverless** - Neon Database serverless driver for PostgreSQL
- **drizzle-zod** - Integration between Drizzle ORM and Zod for validation

## Development and Build Tools
- **vite** - Build tool and development server
- **@vitejs/plugin-react** - React plugin for Vite
- **tsx** - TypeScript execution engine for development
- **esbuild** - JavaScript bundler for production builds

## Form and State Management
- **react-hook-form** - Forms library with minimal re-renders
- **@hookform/resolvers** - Validation resolvers for React Hook Form
- **@tanstack/react-query** - Server state management and caching
- **zod** - Schema validation library

## Server Dependencies
- **express** - Web application framework for Node.js
- **connect-pg-simple** - PostgreSQL session store for Express sessions
- **cors** - Cross-origin resource sharing middleware

## Date and Utility Libraries
- **date-fns** - Modern JavaScript date utility library
- **clsx** - Utility for constructing className strings conditionally
- **nanoid** - URL-safe unique string ID generator