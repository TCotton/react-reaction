const exec = require('child_process').exec;
const path = require('path');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
exec('node -v', function(err, stdout) {
  if (err) {
    throw err;
  }
  if (parseFloat(stdout) < parseFloat(pkg.engines.node)) {
    throw new Error(`[ERROR: React Boilerplate] You need node version ${pkg.engines.node}`);
    process.exit(1);
  }
});