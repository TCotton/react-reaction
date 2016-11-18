const GITHUB = require('../services/github');
const CONST = require('../constants');

module.exports = function (app) {

  app.all('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  });

  app.get(`/${CONST.API}/${CONST.SEARCH}`, GITHUB.search);

};