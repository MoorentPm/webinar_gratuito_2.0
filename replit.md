# MoorentPM Landing Page

## Overview

This is a premium property management landing page for MoorentPM, a luxury short-term rental service targeting high-net-worth individuals in the Triveneto region (Veneto, Trentino, Friuli). The application features a modern Apple-inspired design with smooth animations and a webinar integration for lead generation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack architecture with a clear separation between client and server components:

- **Frontend**: React-based SPA using Vite as the build tool
- **Backend**: Express.js REST API server
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **State Management**: TanStack Query for server state
- **Form Handling**: React Hook Form with Zod validation

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom Apple-inspired design tokens
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: CSS-based animations with scroll-triggered effects

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful endpoints under `/api` namespace
- **Database Layer**: Drizzle ORM with PostgreSQL dialect
- **Storage**: Abstracted storage interface supporting both memory and database implementations
- **Session Management**: Configured for PostgreSQL sessions with connect-pg-simple

### Database Schema
The application uses two main entities:
- **Users**: Basic user management with username/password authentication
- **Newsletter Subscriptions**: Email collection for marketing purposes with unique email constraints

## Data Flow

1. **Newsletter Subscription Flow**:
   - Client submits email via React Hook Form
   - Form validation using Zod schema
   - API request to `/api/newsletter/subscribe`
   - Server validates and stores subscription
   - Success/error feedback via toast notifications

2. **Component Animation Flow**:
   - Intersection Observer API tracks element visibility
   - CSS classes trigger smooth scroll-based animations
   - Apple-like micro-interactions on hover states

## External Dependencies

### Key Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **@hookform/resolvers**: Form validation integration
- **@radix-ui/***: Accessible UI component primitives
- **class-variance-authority**: Type-safe CSS class variants
- **date-fns**: Date manipulation utilities
- **embla-carousel-react**: Carousel/slider functionality

### Backend Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL driver
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **drizzle-zod**: Schema validation integration
- **connect-pg-simple**: PostgreSQL session store

### Development Tools
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production
- **drizzle-kit**: Database migration and introspection tools

## Deployment Strategy

### Build Process
- **Development**: `npm run dev` - Uses tsx for hot reloading with Vite dev server
- **Production Build**: `npm run build` - Vite builds client, esbuild bundles server
- **Database**: `npm run db:push` - Applies schema changes to PostgreSQL

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment detection for development features
- **REPL_ID**: Replit-specific development tooling integration

### File Structure
```
├── client/          # React frontend application
├── server/          # Express.js backend
├── shared/          # Shared TypeScript schemas and types
├── migrations/      # Database migration files
└── dist/           # Production build output
```

The application is designed for seamless deployment on Replit with integrated development tools and can be easily adapted for other cloud platforms with PostgreSQL support.