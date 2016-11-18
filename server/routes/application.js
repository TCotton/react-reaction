const GITHUB = require('../services/github');
const CONST = require('../constants');

module.exports = function (app) {

  app.get(`/${CONST.API}//${CONST.SEARCH}`, GITHUB.search);

};