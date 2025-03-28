const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Route files
const auth = require('./routes/auth');
const tasks = require('./routes/tasks');
const events = require('./routes/events');
const timers = require('./routes/timers');
const music = require('./routes/music');

// Initialize app
const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/auth', auth);
app.use('/api/tasks', tasks);
app.use('/api/events', events);
app.use('/api/timers', timers);
app.use('/api/music', music);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Aashu API' });
});

// Error handler middleware
app.use(errorHandler);

// Define port
const PORT = process.env.PORT || 5000;

// Connect to database and start server
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
});
