# API Documentation

This document provides detailed information about the Aashu application's API endpoints.

## Base URL

All API endpoints are relative to the base URL:

```
http://localhost:5000/api
```

For production deployments, replace with your domain.

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All responses follow this general format:

```json
{
  "success": true|false,
  "data": {...} | [...],
  "error": "Error message" (only when success is false)
}
```

## Authentication Endpoints

### Register User

- **URL**: `/auth/register`
- **Method**: `POST`
- **Auth required**: No
- **Request Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

### Login User

- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth required**: No
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

### Get Current User

- **URL**: `/auth/me`
- **Method**: `GET`
- **Auth required**: Yes
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "data": {
        "_id": "60d0fe4f5311236168a109ca",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "preferences": {
          "theme": "light",
          "colorScheme": "default",
          "notifications": true,
          "defaultView": "week"
        },
        "createdAt": "2023-03-28T10:00:00.000Z",
        "updatedAt": "2023-03-28T10:00:00.000Z"
      }
    }
    ```

### Update User Details

- **URL**: `/auth/updatedetails`
- **Method**: `PUT`
- **Auth required**: Yes
- **Request Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com"
  }
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "data": {
        "_id": "60d0fe4f5311236168a109ca",
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@example.com"
      }
    }
    ```

### Update Password

- **URL**: `/auth/updatepassword`
- **Method**: `PUT`
- **Auth required**: Yes
- **Request Body**:
  ```json
  {
    "currentPassword": "password123",
    "newPassword": "newpassword123"
  }
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

### Update User Preferences

- **URL**: `/auth/preferences`
- **Method**: `PUT`
- **Auth required**: Yes
- **Request Body**:
  ```json
  {
    "theme": "dark",
    "colorScheme": "high-contrast",
    "notifications": true,
    "defaultView": "day",
    "reduceMotion": true,
    "textSize": 120
  }
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "data": {
        "theme": "dark",
        "colorScheme": "high-contrast",
        "notifications": true,
        "defaultView": "day",
        "reduceMotion": true,
        "textSize": 120
      }
    }
    ```

## Task Endpoints

### Get All Tasks

- **URL**: `/tasks`
- **Method**: `GET`
- **Auth required**: Yes
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "count": 2,
      "data": [
        {
          "_id": "60d0fe4f5311236168a109cb",
          "title": "Team Meeting",
          "description": "Weekly team sync",
          "status": "pending",
          "priority": "high",
          "dueDate": "2025-03-29T00:00:00.000Z",
          "category": "work",
          "color": "#6750A4",
          "createdAt": "2025-03-28T10:00:00.000Z",
          "updatedAt": "2025-03-28T10:00:00.000Z"
        },
        {
          "_id": "60d0fe4f5311236168a109cc",
          "title": "Grocery Shopping",
          "description": "Buy fruits and vegetables",
          "status": "pending",
          "priority": "medium",
          "dueDate": "2025-03-28T00:00:00.000Z",
          "category": "personal",
          "color": "#FF8A65",
          "createdAt": "2025-03-28T10:00:00.000Z",
          "updatedAt": "2025-03-28T10:00:00.000Z"
        }
      ]
    }
    ```

### Get Single Task

- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the task
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "data": {
        "_id": "60d0fe4f5311236168a109cb",
        "title": "Team Meeting",
        "description": "Weekly team sync",
        "status": "pending",
        "priority": "high",
        "dueDate": "2025-03-29T00:00:00.000Z",
        "category": "work",
        "color": "#6750A4",
        "createdAt": "2025-03-28T10:00:00.000Z",
        "updatedAt": "2025-03-28T10:00:00.000Z"
      }
    }
    ```

### Create Task

- **URL**: `/tasks`
- **Method**: `POST`
- **Auth required**: Yes
- **Request Body**:
  ```json
  {
    "title": "Doctor Appointment",
    "description": "Annual checkup",
    "status": "pending",
    "priority": "high",
    "dueDate": "2025-03-30T09:00:00.000Z",
    "category": "health",
    "color": "#42A5F5"
  }
  ```
- **Success Response**: 
  - **Code**: 201
  - **Content**: 
    ```json
    {
      "success": true,
      "data": {
        "_id": "60d0fe4f5311236168a109cd",
        "title": "Doctor Appointment",
        "description": "Annual checkup",
        "status": "pending",
        "priority": "high",
        "dueDate": "2025-03-30T09:00:00.000Z",
        "category": "health",
        "color": "#42A5F5",
        "createdAt": "2025-03-28T10:00:00.000Z",
        "updatedAt": "2025-03-28T10:00:00.000Z"
      }
    }
    ```

### Update Task

- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the task
- **Request Body**:
  ```json
  {
    "title": "Doctor Appointment",
    "description": "Annual checkup with Dr. Smith",
    "status": "pending",
    "priority": "high",
    "dueDate": "2025-03-30T10:00:00.000Z",
    "category": "health",
    "color": "#42A5F5"
  }
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "data": {
        "_id": "60d0fe4f5311236168a109cd",
        "title": "Doctor Appointment",
        "description": "Annual checkup with Dr. Smith",
        "status": "pending",
        "priority": "high",
        "dueDate": "2025-03-30T10:00:00.000Z",
        "category": "health",
        "color": "#42A5F5",
        "createdAt": "2025-03-28T10:00:00.000Z",
        "updatedAt": "2025-03-28T10:05:00.000Z"
      }
    }
    ```

### Delete Task

- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the task
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "data": {}
    }
    ```

### Get Tasks by Date

- **URL**: `/tasks/date/:date`
- **Method**: `GET`
- **Auth required**: Yes
- **URL Parameters**: `date=[string]` where `date` is in ISO format (YYYY-MM-DD)
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "count": 1,
      "data": [
        {
          "_id": "60d0fe4f5311236168a109cc",
          "title": "Grocery Shopping",
          "description": "Buy fruits and vegetables",
          "status": "pending",
          "priority": "medium",
          "dueDate": "2025-03-28T00:00:00.000Z",
          "category": "personal",
          "color": "#FF8A65",
          "createdAt": "2025-03-28T10:00:00.000Z",
          "updatedAt": "2025-03-28T10:00:00.000Z"
        }
      ]
    }
    ```

### Get Tasks by Status

- **URL**: `/tasks/status/:status`
- **Method**: `GET`
- **Auth required**: Yes
- **URL Parameters**: `status=[string]` where `status` is one of: pending, completed, cancelled
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "count": 2,
      "data": [
        {
          "_id": "60d0fe4f5311236168a109cb",
          "title": "Team Meeting",
          "description": "Weekly team sync",
          "status": "pending",
          "priority": "high",
          "dueDate": "2025-03-29T00:00:00.000Z",
          "category": "work",
          "color": "#6750A4",
          "createdAt": "2025-03-28T10:00:00.000Z",
          "updatedAt": "2025-03-28T10:00:00.000Z"
        },
        {
          "_id": "60d0fe4f5311236168a109cc",
          "title": "Grocery Shopping",
          "description": "Buy fruits and vegetables",
          "status": "pending",
          "priority": "medium",
          "dueDate": "2025-03-28T00:00:00.000Z",
          "category": "personal",
          "color": "#FF8A65",
          "createdAt": "2025-03-28T10:00:00.000Z",
          "updatedAt": "2025-03-28T10:00:00.000Z"
        }
      ]
    }
    ```

## Event Endpoints

### Get All Events

- **URL**: `/events`
- **Method**: `GET`
- **Auth required**: Yes
- **Success Response**: 
  - **Code**: 200
  - **Content**: Similar to tasks but with event-specific fields

### Get Single Event

- **URL**: `/events/:id`
- **Method**: `GET`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the event
- **Success Response**: 
  - **Code**: 200
  - **Content**: Event object

### Create Event

- **URL**: `/events`
- **Method**: `POST`
- **Auth required**: Yes
- **Request Body**:
  ```json
  {
    "title": "Team Meeting",
    "description": "Weekly team sync",
    "startTime": "2025-03-29T10:00:00.000Z",
    "endTime": "2025-03-29T11:00:00.000Z",
    "location": "Conference Room A",
    "color": "#6750A4"
  }
  ```
- **Success Response**: 
  - **Code**: 201
  - **Content**: Created event object

### Update Event

- **URL**: `/events/:id`
- **Method**: `PUT`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the event
- **Request Body**: Updated event fields
- **Success Response**: 
  - **Code**: 200
  - **Content**: Updated event object

### Delete Event

- **URL**: `/events/:id`
- **Method**: `DELETE`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the event
- **Success Response**: 
  - **Code**: 200
  - **Content**: Empty object

### Get Events by Date Range

- **URL**: `/events/range/:startDate/:endDate`
- **Method**: `GET`
- **Auth required**: Yes
- **URL Parameters**: 
  - `startDate=[string]` start date in ISO format
  - `endDate=[string]` end date in ISO format
- **Success Response**: 
  - **Code**: 200
  - **Content**: Array of events within the date range

## Timer Endpoints

### Get All Timers

- **URL**: `/timers`
- **Method**: `GET`
- **Auth required**: Yes
- **Success Response**: 
  - **Code**: 200
  - **Content**: Array of timer objects

### Get Single Timer

- **URL**: `/timers/:id`
- **Method**: `GET`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the timer
- **Success Response**: 
  - **Code**: 200
  - **Content**: Timer object

### Create Timer

- **URL**: `/timers`
- **Method**: `POST`
- **Auth required**: Yes
- **Request Body**:
  ```json
  {
    "name": "Focus Session",
    "duration": 25,
    "type": "focus",
    "color": "#6750A4",
    "icon": "🧠"
  }
  ```
- **Success Response**: 
  - **Code**: 201
  - **Content**: Created timer object

### Update Timer

- **URL**: `/timers/:id`
- **Method**: `PUT`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the timer
- **Request Body**: Updated timer fields
- **Success Response**: 
  - **Code**: 200
  - **Content**: Updated timer object

### Delete Timer

- **URL**: `/timers/:id`
- **Method**: `DELETE`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the timer
- **Success Response**: 
  - **Code**: 200
  - **Content**: Empty object

### Start Timer Session

- **URL**: `/timers/:id/start`
- **Method**: `POST`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the timer
- **Success Response**: 
  - **Code**: 201
  - **Content**: Created timer session object

### Complete Timer Session

- **URL**: `/timers/sessions/:id/complete`
- **Method**: `PUT`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the timer session
- **Request Body**:
  ```json
  {
    "notes": "Completed focus session on project proposal"
  }
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: Updated timer session object

### Get Timer Sessions

- **URL**: `/timers/sessions`
- **Method**: `GET`
- **Auth required**: Yes
- **Success Response**: 
  - **Code**: 200
  - **Content**: Array of timer session objects

### Get Timer Sessions by Date Range

- **URL**: `/timers/sessions/range/:startDate/:endDate`
- **Method**: `GET`
- **Auth required**: Yes
- **URL Parameters**: 
  - `startDate=[string]` start date in ISO format
  - `endDate=[string]` end date in ISO format
- **Success Response**: 
  - **Code**: 200
  - **Content**: Array of timer session objects within the date range

## Music Endpoints

### Get All Music

- **URL**: `/music`
- **Method**: `GET`
- **Auth required**: Yes
- **Success Response**: 
  - **Code**: 200
  - **Content**: Array of music objects

### Get Single Music Track

- **URL**: `/music/:id`
- **Method**: `GET`
- **Auth required**: Yes
- **URL Parameters**: `id=[string]` where `id` is the ID of the music track
- **Success Response**: 
  - **Code**: 200
  - **Content**: Music track object

### Get Music by Category

- **URL**: `/music/category/:category`
- **Method**: `GET`
- **Auth required**: Yes
- **URL Parameters**: `category=[string]` where `category` is one of the predefined music categories
- **Success Response**: 
  - **Code**: 200
  - **Content**: Array of music tracks in the specified category

## Error Responses

### Validation Error

- **Code**: 400
- **Content**: 
  ```json
  {
    "success": false,
    "error": "Please provide an email and password"
  }
  ```

### Authentication Error

- **Code**: 401
- **Content**: 
  ```json
  {
    "success": false,
    "error": "Not authorized to access this route"
  }
  ```

### Not Found Error

- **Code**: 404
- **Content**: 
  ```json
  {
    "success": false,
    "error": "Resource not found"
  }
  ```

### Server Error

- **Code**: 500
- **Content**: 
  ```json
  {
    "success": false,
    "error": "Server Error"
  }
  ```
