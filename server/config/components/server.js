// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const log = require('loglevel');
const router = require('../../routes/application');
const common = require('./common');

const app = express();

// db
if(common.isDevelopment) {
  mongoose.connect('mongodb://localhost:auth/auth');
} else {
  log.error('No production DB');
}
// App Set up
app.use(morgan('combined'));
app.use(bodyParser.json({
  type: '*/*'
}));
router(app);

// Server setup
const port = process.env.port || common.server.port;

const server = http.createServer(app);

module.exports = server.listen(port, (err) => {

  if (err) {
    return console.log('server error: ', err);
  }

  return console.log(`server is listening on ${port}`);

});
