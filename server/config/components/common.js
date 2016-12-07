const Joi = require('joi');

const envVarsSchema = Joi.object({

  NODE_ENV: Joi.string().allow(['development', 'production', 'test', 'provision']).required(),

  PORT: Joi.number().required()

}).unknown().required();

const {error, value: envVars} = Joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  isTest: Object.is(envVars.NODE_ENV, 'test'),
  isDevelopment: Object.is(envVars.NODE_ENV, 'development'),
  isProduction: Object.is(envVars.NODE_ENV, 'production'),
  server: {
    port: envVars.PORT
  }
};

module.exports = config;
