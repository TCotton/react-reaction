const GITHUB = require('../services/github');

module.exports = function (app) {

  app.get('/', GITHUB.search);

};