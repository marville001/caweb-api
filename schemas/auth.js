const Joi = require("joi");

module.exports = {
  loginSchema: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};
