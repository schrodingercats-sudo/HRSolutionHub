# HR Consulting Website

## Overview

This is a full-stack web application for an HR consulting company built with React frontend and Express.js backend. The application provides an elegant, modern interface for potential clients to learn about HR services and submit inquiries. It features a responsive design with a professional color scheme using warm coral and golden sand tones.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod schemas for data validation
- **Session Management**: connect-pg-simple for PostgreSQL session store

### Data Storage
- **Primary Database**: PostgreSQL via Neon Database
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database migrations
- **Fallback**: In-memory storage for development/testing

## Key Components

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Inquiries Table**: Client inquiry submissions with comprehensive fields:
  - Personal information (firstName, lastName, email, phone)
  - Company details (company, companySize)
  - Service interests and custom messages
  - Automatic timestamp tracking

### API Endpoints
- `POST /api/inquiries` - Create new inquiry
- `GET /api/inquiries` - Retrieve all inquiries (admin)
- `GET /api/inquiries/:id` - Retrieve specific inquiry

### UI Components
- Professional landing page with service showcase
- Responsive contact form with validation
- Modern UI components using shadcn/ui design system
- Mobile-first responsive design
- Toast notifications for user feedback

## Data Flow

1. **Client Interaction**: Users visit the homepage and view HR services
2. **Form Submission**: Users fill out the inquiry form with validation
3. **API Processing**: Frontend sends validated data to Express backend
4. **Data Persistence**: Backend validates and stores inquiry in PostgreSQL
5. **User Feedback**: Success/error notifications displayed via toast system
6. **Admin Access**: Inquiries can be retrieved for administrative review

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Hook Form)
- Radix UI primitives for accessible components
- TanStack Query for server state management
- Tailwind CSS for styling utilities
- Zod for schema validation
- Wouter for routing

### Backend Dependencies
- Express.js for HTTP server
- Drizzle ORM for database operations
- Neon Database serverless driver
- Zod for data validation
- connect-pg-simple for session management

### Development Tools
- Vite for frontend development and building
- TypeScript for type safety
- Drizzle Kit for database migrations
- ESBuild for backend bundling

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied to PostgreSQL database

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)
- Session configuration for PostgreSQL-backed sessions

### Hosting Requirements
- Node.js runtime support
- PostgreSQL database (Neon Database recommended)
- Static file serving capability for frontend assets
- Environment variable support for database configuration

## Changelog
- July 02, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.