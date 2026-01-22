const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db'); // Import DB Config

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// --- MIDDLEWARES ---
app.use(express.json({ limit: '50mb' })); // Body parser with increased limit for base64 images
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // URL Encoded parser with limit
app.use(cors());         // Enable CORS
app.use(helmet());       // Security Headers
app.use(morgan('dev'));  // Logging

// --- ROUTES ---
app.use('/api/auth', require('./modules/auth/auth.routes'));
app.use('/api/courses', require('./modules/learning/course.routes'));
app.use('/api/events', require('./modules/competition/event.routes'));
app.use('/api/enrollments', require('./modules/learning/enrollment.routes'));
app.use('/api/admin', require('./modules/admin/admin.routes'));
app.use('/api/challenges', require('./modules/competition/challenge.routes'));

// Example of a Protected Route (For Testing)
// We will move this to a proper module later
const { protect, authorize } = require('./middlewares/authMiddleware');

app.get('/api/test/admin', protect, authorize('admin'), (req, res) => {
  res.send('If you see this, you are an Admin!');
});

app.get('/api/test/student', protect, (req, res) => {
  res.send(`Hello Student ${req.user.name}, you have access!`);
});


// --- ERROR HANDLING ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});