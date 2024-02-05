import * as Joi from 'joi';

/* The code is defining a validation schema using the Joi library in TypeScript. The validation schema
is an object that specifies the expected structure and validation rules for a set of environment
variables. */
export const validationSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_AUTO_LOAD_MODELS: Joi.boolean().default(false),
  API_PORT: Joi.number().default(3200),
});
