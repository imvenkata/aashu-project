# Local Development Setup Guide

This guide provides detailed instructions for setting up the Aashu application for local development.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v16 or higher)
- npm (v7 or higher) or yarn
- MongoDB (v4.4 or higher)
- Git

## Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aashu.git
   cd aashu
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/aashu
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

5. Start MongoDB service (if not already running):
   ```bash
   # On Ubuntu/Debian
   sudo service mongodb start
   
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Windows
   # MongoDB should be running as a service
   ```

6. Start the backend server in development mode:
   ```bash
   npm run dev
   ```

   This will start the server with nodemon, which automatically restarts when you make changes to the code.

7. The backend API will be available at `http://localhost:5000`

## Frontend Setup

1. Open a new terminal window and navigate to the frontend directory from the project root:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend application will be available at `http://localhost:3000`

## Development Workflow

1. Backend API changes:
   - Modify files in the backend directory
   - The server will automatically restart thanks to nodemon
   - Test API endpoints using tools like Postman or curl

2. Frontend changes:
   - Modify files in the frontend/src directory
   - The browser will automatically reload with your changes
   - Use React Developer Tools for debugging

3. Database operations:
   - Connect to MongoDB using MongoDB Compass or the mongo shell
   - The default database name is 'aashu'
   - Example connection string: `mongodb://localhost:27017/aashu`

## Testing

### Backend Testing

1. Run backend tests:
   ```bash
   cd backend
   npm test
   ```

### Frontend Testing

1. Run frontend tests:
   ```bash
   cd frontend
   npm test
   ```

## Troubleshooting

### Backend Issues

- **MongoDB connection errors**: Ensure MongoDB is running and the connection string in your .env file is correct
- **Port already in use**: Change the PORT value in your .env file

### Frontend Issues

- **Node modules issues**: Try deleting the node_modules folder and package-lock.json, then run npm install again
- **API connection errors**: Ensure the backend server is running and the proxy in vite.config.js is correctly set to the backend URL

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Material UI Documentation](https://mui.com/getting-started/usage/)
