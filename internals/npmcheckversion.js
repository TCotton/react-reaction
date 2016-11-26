const exec = require('child_process').exec;
const path = require('path');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
exec('npm -v', function (err, stdout) {
  if (err) {
    throw err;
  }
  if (parseFloat(stdout) < parseFloat(pkg.engines.npm)) {
    throw new Error(`[ERROR: React Boilerplate] You need npm version ${pkg.engines.npm}`);
    process.exit(1);
  }
});