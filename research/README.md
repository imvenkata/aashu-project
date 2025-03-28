# Aashu - ADHD & Autism-Friendly Planning Application

Aashu is a comprehensive planning application designed specifically for individuals with ADHD and autism to help manage their daily lives. Inspired by Tiimo, Aashu provides visual planning tools, task management, timers, and accessibility features tailored to neurodivergent users.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
   - [Prerequisites](#prerequisites)
   - [Local Development Setup](#local-development-setup)
   - [Docker Setup](#docker-setup)
3. [Cloud Deployment](#cloud-deployment)
4. [Architecture](#architecture)
5. [API Documentation](#api-documentation)
6. [User Guide](#user-guide)

## Features

- **User Authentication**: Secure login and registration system
- **Visual Dashboard**: Clear, distraction-free interface showing daily focus and upcoming tasks
- **Task Management**: Create, edit, and organize tasks with priority levels and categories
- **Visual Calendar**: Day, week, and month views for flexible scheduling
- **Visual Timers**: Customizable timers with visual countdowns for focus sessions
- **Energy Level Tracking**: Monitor energy levels throughout the day
- **Accessibility Features**: High contrast mode, reduced motion, text size adjustment, and color-blind friendly options
- **Focus Patterns**: Visualization of productivity and focus patterns

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized setup)

### Local Development Setup

#### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aashu.git
   cd aashu
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/aashu
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Access the application at `http://localhost:3000`

### Docker Setup

1. Make sure Docker and Docker Compose are installed on your system.

2. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aashu.git
   cd aashu
   ```

3. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

4. Access the application at `http://localhost:3000`

## Cloud Deployment

### AWS Deployment

1. Set up an EC2 instance with Docker installed.

2. Clone the repository on your EC2 instance:
   ```bash
   git clone https://github.com/yourusername/aashu.git
   cd aashu
   ```

3. Create a `.env` file with production settings.

4. Build and start the containers:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```

5. Configure your domain and set up HTTPS using Nginx and Let's Encrypt.

### Heroku Deployment

1. Install the Heroku CLI and log in:
   ```bash
   heroku login
   ```

2. Create a new Heroku app:
   ```bash
   heroku create aashu-app
   ```

3. Add MongoDB add-on:
   ```bash
   heroku addons:create mongodb:sandbox
   ```

4. Set environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set JWT_EXPIRE=30d
   ```

5. Deploy the application:
   ```bash
   git push heroku main
   ```

## Architecture

Aashu follows a modern web application architecture:

- **Frontend**: React with Material UI for the user interface
- **Backend**: Node.js with Express for the API server
- **Database**: MongoDB for data storage
- **Authentication**: JWT-based authentication system
- **Containerization**: Docker for consistent deployment

The application is structured as follows:

```
aashu/
├── frontend/           # React frontend application
│   ├── src/            # Source code
│   │   ├── components/ # UI components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React context for state management
│   │   ├── hooks/      # Custom React hooks
│   │   ├── services/   # API service functions
│   │   └── utils/      # Utility functions
│   └── Dockerfile      # Frontend Docker configuration
├── backend/            # Node.js backend application
│   ├── controllers/    # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   └── Dockerfile      # Backend Docker configuration
├── docker-compose.yml  # Docker Compose configuration
└── Dockerfile          # Main Docker configuration
```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/logout` - Logout a user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update user password
- `PUT /api/auth/preferences` - Update user preferences

### Task Endpoints

- `GET /api/tasks` - Get all tasks for a user
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/date/:date` - Get tasks by date
- `GET /api/tasks/status/:status` - Get tasks by status

### Event Endpoints

- `GET /api/events` - Get all events for a user
- `GET /api/events/:id` - Get a single event
- `POST /api/events` - Create a new event
- `PUT /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event
- `GET /api/events/range/:startDate/:endDate` - Get events by date range

### Timer Endpoints

- `GET /api/timers` - Get all timers for a user
- `GET /api/timers/:id` - Get a single timer
- `POST /api/timers` - Create a new timer
- `PUT /api/timers/:id` - Update a timer
- `DELETE /api/timers/:id` - Delete a timer
- `POST /api/timers/:id/start` - Start a timer session
- `PUT /api/timers/sessions/:id/complete` - Complete a timer session
- `GET /api/timers/sessions` - Get timer sessions for a user
- `GET /api/timers/sessions/range/:startDate/:endDate` - Get timer sessions by date range

### Music Endpoints

- `GET /api/music` - Get all music tracks
- `GET /api/music/:id` - Get a single music track
- `POST /api/music` - Create a new music track (Admin only)
- `PUT /api/music/:id` - Update a music track (Admin only)
- `DELETE /api/music/:id` - Delete a music track (Admin only)
- `GET /api/music/category/:category` - Get music by category

## User Guide

### Getting Started

1. Register for an account or log in if you already have one.
2. Customize your preferences in the Settings page.
3. Create tasks and events to populate your calendar.
4. Set up timer presets for focus sessions.

### Dashboard

The dashboard provides an overview of your day, including:
- Today's focus task
- Upcoming tasks
- Quick actions for timers and calendar views
- Energy level tracking

### Task Management

- Create tasks with titles, descriptions, due dates, and priorities
- Organize tasks by categories with color coding
- Mark tasks as completed or pending
- Filter tasks by status or date

### Calendar

- Switch between day, week, and month views
- Create events with start and end times
- Color-code events for visual organization
- Navigate between dates with intuitive controls

### Timers

- Use preset timers for focus sessions, breaks, or custom activities
- Visual countdown with progress indicator
- Customize timer duration, color, and icon
- Track completed timer sessions

### Accessibility Settings

- Toggle high contrast mode for better visibility
- Enable color-blind friendly mode
- Adjust text size for readability
- Reduce motion for fewer distractions
- Customize notification sounds and volume

---

For more information or support, please contact support@aashu.com
