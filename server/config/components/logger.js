const joi = require('joi');
const common = require('./common');

const envVarsSchema = joi.object({

  LOGGER_LEVEL: joi.string().allow(['error', 'warn', 'info', 'verbose', 'debug', 'silly']).default(common.isDevelopment ? 'debug' : 'info'),

  LOGGER_ENABLED: joi.boolean().truthy('TRUE').truthy('true').falsy('FALSE').falsy('false').default(true)

}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  logger: {
    level: envVars.LOGGER_LEVEL,
    enabled: envVars.LOGGER_ENABLED
  }
};

module.exports = config;

