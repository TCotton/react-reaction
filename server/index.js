// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes/application');
// const CONST = require('./constants');

const app = express();

// db
mongoose.connect('mongodb://localhost:auth/auth');

// App Set up
app.use(morgan('combined'));
app.use(bodyParser.json({
  type: '*/*'
}));
router(app);

// Server setup
const port = process.env.port || 3090;
const server = http.createServer(app);

server.listen(port);
