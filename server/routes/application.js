const passport = require('passport');
const passportService = require('../services/passport');
const GITHUB = require('../services/github');
const CONST = require('../constants');
const Authentication = require('../controllers/authentication');

const requireAuth = passport.authenticate('jwt', {
  session: false
});
const requireSignin = passport.authenticate('local', {
  session: false
});

module.exports = function (app) {

  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
  });

  app.get(`/${CONST.API}/${CONST.SEARCH}`, GITHUB.search);

  app.get('/', requireAuth, (req, res) => {
    res.send({
      message: 'Super secret code is a secret!!'
    });
  });

  app.post(`/${CONST.API}/${CONST.SIGNIN}`, requireSignin, Authentication.signin);

  app.post(`/${CONST.API}/${CONST.SIGNUP}`, Authentication.signup);

};
