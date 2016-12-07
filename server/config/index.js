const logger = require('./components/logger');
const server = require('./components/server');
const common = require('./components/common');

const config = Object.assign({}, common, logger, server);

module.exports = config;