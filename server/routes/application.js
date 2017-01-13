const passport = require('passport');
const RateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const passportService = require('../services/passport');
const GITHUB = require('../services/github');
const CONST = require('../constants');
const Authentication = require('../controllers/authentication');
const UsersList = require('../controllers/users_list');
const RemoveItem = require('../controllers/remove_items');

const requireAuth = passport.authenticate('jwt', {
  session: false
});
const requireSignin = passport.authenticate('local', {
  session: false
});

const apiLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  delayMs: 0 // disabled
});

// setup route middlewares 
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
  });

  app.get(`/${CONST.API}/${CONST.SEARCH}`, GITHUB.search);

  app.get(`/${CONST.API}/${CONST.USER}`, UsersList.findUsers);

  app.get('/', requireAuth, (req, res) => {
    res.send({
      message: 'Super secret code is a secret!!'
    });
  });

  app.get(`/${CONST.API}/${CONST.SIGNIN}`, csrfProtection, (req, res) => {
    // pass the csrfToken to the view
    res.render('send', { csrfToken: req.csrfToken() });
  });

  app.post(`/${CONST.API}/${CONST.SIGNIN}`, apiLimiter, requireSignin, Authentication.signin);

  app.get(`/${CONST.API}/${CONST.SIGNUP}`, csrfProtection, (req, res) => {
    // pass the csrfToken to the view
    res.render('send', { csrfToken: req.csrfToken() });
  });

  app.post(`/${CONST.API}/${CONST.SIGNUP}`, apiLimiter, Authentication.signup);

  app.get(`/${CONST.API}/${CONST.REMOVE}`, csrfProtection, (req, res) => {
    // pass the csrfToken to the view
    res.render('send', { csrfToken: req.csrfToken() });
  });

  app.post(`/${CONST.API}/${CONST.REMOVE}`, apiLimiter, RemoveItem.remove);

  app.get(`/${CONST.API}/${CONST.RET_REMOVE}`, apiLimiter, RemoveItem.retrieveItems);

};
