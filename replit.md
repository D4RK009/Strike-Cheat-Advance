# Overview

This is a full-stack web application built with React and Express that serves as a services marketplace. The frontend displays service cards with pricing, descriptions, and features, while the backend provides REST API endpoints to manage service data. The application showcases various digital services like web development, digital marketing, UI/UX design, and more, with integration to Discord for customer engagement.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation via Hookform Resolvers

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API with JSON responses
- **Storage**: In-memory storage with MemStorage class (designed for easy database migration)
- **Development**: Hot reload with tsx for TypeScript execution

## Data Storage Solutions
- **Current**: In-memory storage with pre-populated service data
- **Configured For**: PostgreSQL with Drizzle ORM
- **Database Schema**: Users and services tables with UUID primary keys
- **Migration Support**: Drizzle Kit for schema migrations

## Authentication and Authorization
- **Setup**: Basic user schema with username/password fields
- **Session Management**: Connect-pg-simple for PostgreSQL session store
- **Current State**: Authentication infrastructure present but not actively used in UI

## External Service Integrations
- **Discord**: Integration for customer engagement (Discord invite links)
- **Neon Database**: Configured as PostgreSQL provider via @neondatabase/serverless
- **Unsplash**: External image URLs for service thumbnails
- **Replit**: Development environment integration with custom plugins

## Design Patterns
- **Separation of Concerns**: Clear separation between client, server, and shared code
- **Type Safety**: Shared TypeScript schemas between frontend and backend
- **Component Composition**: Radix UI primitives with custom styling
- **Error Handling**: Centralized error handling with custom error overlay
- **Development Experience**: Hot reload, TypeScript checking, and development banners

## Key Architectural Decisions
- **Monorepo Structure**: Single repository with client, server, and shared directories
- **Schema Sharing**: Common TypeScript types and Zod schemas in shared directory
- **Database Abstraction**: Storage interface allows easy swapping between in-memory and database storage
- **Environment Flexibility**: Configuration supports both development and production deployments
- **Modern Tooling**: Latest versions of React, TypeScript, and build tools for optimal developer experience

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection for Neon
- **drizzle-orm** & **drizzle-kit**: Type-safe SQL ORM and migration toolkit
- **express**: Web application framework for Node.js
- **react** & **@vitejs/plugin-react**: React framework with Vite integration

## UI and Styling
- **@radix-ui/***: Complete suite of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant handling for components
- **clsx** & **tailwind-merge**: Conditional class name utilities

## Development and Build Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution engine for development

## Data Management
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form** & **@hookform/resolvers**: Form handling with validation
- **zod**: Runtime type validation and schema definition
- **drizzle-zod**: Integration between Drizzle ORM and Zod schemas

## Additional Utilities
- **wouter**: Minimalist routing for React
- **date-fns**: Date manipulation library
- **nanoid**: Unique ID generation
- **connect-pg-simple**: PostgreSQL session store for Express

## Development-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Replit development integration