// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const log = require('loglevel');
const helmet = require('helmet');
const mime = require('mime');
const fs = require('fs');

const router = require('../../routes/application');
const common = require('./common');
const mongoDB = require('../../config');

const app = express();

app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());

if (common.isProduction) {
  app.use(helmet.hsts({ maxAge: 31536000 }));
}

// db
if (common.isDevelopment) {
  mongoose.connect('mongodb://localhost:auth/auth');
} else {
  mongoose.connect(mongoDB.MONGO_MODULUS);
}

app.use(cookieParser());
app.use(morgan('combined'));
app.use(bodyParser.json({
  type: '*/*'
}));

if (common.isProduction) {

  app.use(express.static('build', { root: __base }));

 /* app.get('/!*', (req, res, next) => {

    if (req.url.endsWith('.js')) {

      fs.readFile(req.url, (err, data) => {
        if (err) {
          res.writeHead(404);
          return res.end('File not found.');
        }

        res.setHeader('Content-Type', mime.lookup(req.url));
        res.writeHead(200);
        res.end(data);
      });

    } else {
      next();
    }

  });*/

  app.get('/*', (req, res, next) => {

    if (!req.url.startsWith('/api/')) {
      res.sendFile('build/index.html', { root: __base });
    }

    if (req.url.startsWith('/api/')) {
      next();
    }

  });

}

router(app);

// Server setup
const port = process.env.port || common.server.port;

const server = http.createServer(app);

function handler(req, res) {


}

module.exports = server.listen(port, (err) => {

  if (err) {
    return console.log('server error: ', err);
  }

  return console.log(`server is listening on ${port}`);

});
