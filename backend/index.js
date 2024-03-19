// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const { URI } = require('./auth/Secrets');

// Connect to MongoDB database
mongoose.connect(URI);

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Cors
const whiteList = []
app.use(cors())

// Routes
app.use('/', require('./routes/route'))


// Start the server
app.listen(5000, () => {
  console.log(`Server is running...`);
});
