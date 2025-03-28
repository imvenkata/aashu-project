# Aashu Application Architecture

## Overview
Aashu is a planning application designed specifically for individuals with ADHD and autism to help manage their daily lives. Based on our exploration of Tiimo, we'll create a similar application with a focus on visual planning, intuitive interfaces, and features tailored to neurodivergent users.

## System Architecture

### 1. High-Level Architecture
Aashu will follow a modern web application architecture with:

- **Frontend**: React.js single-page application
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (NoSQL database)
- **Authentication**: JWT-based authentication system
- **API**: RESTful API for communication between frontend and backend
- **Containerization**: Docker for easy deployment and scaling

### 2. Component Breakdown

#### 2.1 Frontend Components
- **Authentication Module**: Login, registration, password reset
- **Dashboard**: Main interface showing daily overview
- **Calendar Component**: Visual timeline with daily, weekly, and monthly views
- **Task Management**: Task creation, editing, and organization
- **Timer Component**: Visual countdown timers for focus sessions
- **Music Player**: Background focus music options
- **Settings Panel**: User preferences and customization
- **Notification System**: Visual and audio reminders

#### 2.2 Backend Services
- **Authentication Service**: User registration, login, token management
- **User Service**: User profile management
- **Task Service**: CRUD operations for tasks and events
- **Calendar Service**: Timeline and schedule management
- **Timer Service**: Timer functionality and history
- **Notification Service**: Reminder generation and delivery
- **Settings Service**: User preferences storage and retrieval
- **AI Planning Service**: Optional AI assistance for planning (future enhancement)

#### 2.3 Database Models
- **User Model**: User information and authentication details
- **Task Model**: Task details, status, and metadata
- **Event Model**: Calendar events with time and duration
- **Timer Model**: Timer configurations and history
- **Settings Model**: User preferences and application settings
- **Music Model**: Focus music tracks and categories

## Database Schema

### User Collection
```json
{
  "_id": "ObjectId",
  "email": "String",
  "password": "String (hashed)",
  "firstName": "String",
  "lastName": "String",
  "createdAt": "Date",
  "updatedAt": "Date",
  "lastLogin": "Date",
  "preferences": {
    "theme": "String",
    "colorScheme": "String",
    "notifications": "Boolean",
    "defaultView": "String (day/week/month)",
    "musicPreferences": ["String"]
  }
}
```

### Task Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "title": "String",
  "description": "String",
  "status": "String (pending/completed/cancelled)",
  "priority": "Number",
  "dueDate": "Date",
  "startTime": "Date",
  "endTime": "Date",
  "duration": "Number (minutes)",
  "isAllDay": "Boolean",
  "category": "String",
  "color": "String",
  "icon": "String",
  "reminderTime": "Date",
  "repeatPattern": "String",
  "tags": ["String"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Event Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "title": "String",
  "description": "String",
  "startTime": "Date",
  "endTime": "Date",
  "location": "String",
  "color": "String",
  "icon": "String",
  "isRecurring": "Boolean",
  "recurrencePattern": "Object",
  "reminderTime": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Timer Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "name": "String",
  "duration": "Number (minutes)",
  "type": "String (focus/break)",
  "color": "String",
  "icon": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### TimerSession Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "timerId": "ObjectId (ref: Timer)",
  "startTime": "Date",
  "endTime": "Date",
  "completed": "Boolean",
  "notes": "String"
}
```

### Music Collection
```json
{
  "_id": "ObjectId",
  "title": "String",
  "category": "String",
  "url": "String",
  "duration": "Number (seconds)",
  "artist": "String",
  "coverImage": "String"
}
```

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/reset-password` - Password reset
- `GET /api/auth/verify-email/:token` - Email verification

### User Endpoints
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `GET /api/users/settings` - Get user settings
- `PUT /api/users/settings` - Update user settings

### Task Endpoints
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/date/:date` - Get tasks by date
- `GET /api/tasks/status/:status` - Get tasks by status

### Calendar Endpoints
- `GET /api/calendar/events` - Get all events
- `POST /api/calendar/events` - Create new event
- `GET /api/calendar/events/:id` - Get event by ID
- `PUT /api/calendar/events/:id` - Update event
- `DELETE /api/calendar/events/:id` - Delete event
- `GET /api/calendar/events/range/:start/:end` - Get events in date range

### Timer Endpoints
- `GET /api/timers` - Get all timers
- `POST /api/timers` - Create new timer
- `GET /api/timers/:id` - Get timer by ID
- `PUT /api/timers/:id` - Update timer
- `DELETE /api/timers/:id` - Delete timer
- `POST /api/timers/:id/start` - Start timer session
- `PUT /api/timers/:id/stop` - Stop timer session
- `GET /api/timers/sessions` - Get timer session history

### Music Endpoints
- `GET /api/music/categories` - Get music categories
- `GET /api/music/tracks/:category` - Get tracks by category
- `GET /api/music/track/:id` - Get track by ID

## Frontend Architecture

### Component Structure
```
src/
├── assets/            # Static assets (images, icons, sounds)
├── components/        # Reusable UI components
│   ├── auth/          # Authentication components
│   ├── calendar/      # Calendar and timeline components
│   ├── common/        # Common UI elements
│   ├── layout/        # Layout components
│   ├── music/         # Music player components
│   ├── settings/      # Settings components
│   ├── tasks/         # Task management components
│   └── timer/         # Timer components
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # API service functions
├── styles/            # Global styles and themes
├── utils/             # Utility functions
└── App.js             # Main application component
```

### State Management
- React Context API for global state
- Local component state for UI-specific state
- Redux for complex state management (if needed)

## Backend Architecture

### Directory Structure
```
server/
├── config/            # Configuration files
├── controllers/       # Request handlers
├── middleware/        # Express middleware
├── models/            # Database models
├── routes/            # API routes
├── services/          # Business logic
├── utils/             # Utility functions
└── server.js          # Main server file
```

## Deployment Architecture

### Docker Configuration
- Frontend container
- Backend container
- MongoDB container
- Nginx container for reverse proxy

### Docker Compose Setup
- Development environment
- Production environment
- Database persistence with volumes

## Security Considerations
- JWT-based authentication
- Password hashing with bcrypt
- HTTPS for all communications
- Input validation and sanitization
- Rate limiting for API endpoints
- CORS configuration
- Environment variable management

## Accessibility Features
- High contrast mode
- Screen reader compatibility
- Keyboard navigation
- Customizable font sizes
- Reduced motion option
- Color blindness considerations

## Future Enhancements
- AI-powered planning assistance
- Natural language processing for task creation
- Integration with external calendars
- Mobile application (React Native)
- Offline functionality
- Analytics dashboard for usage patterns
- Social features for shared planning

This architecture provides a solid foundation for building the Aashu application with features similar to Tiimo, specifically designed for individuals with ADHD and autism.
