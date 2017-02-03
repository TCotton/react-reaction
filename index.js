// Main starting point of the application
/* eslint-disable */
try {
  global.__base = __dirname + '/';
  require('./server/config/');
} catch (ex) {
  throw ex;
}
/*eslint-enable */
