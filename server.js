require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
  origin: '*'
}));

// Conditionally connect to database if MONGODB_URI is provided
// For now, we're using in-memory storage, so we'll skip DB connection
// Uncomment the next lines when you have MongoDB running
// const connectDB = require('./config/db');
// connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to your Express server!',
    timestamp: new Date().toISOString(),
    status: 'Server is running successfully'
  });
});

// Another example route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Import and use users route
const users = require('./routes/users');
app.use('/api/users', users);

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see your server in action!`);
});

module.exports = app;