const Joi = require("joi");

module.exports = {
  loginSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
  registerSchema: Joi.object().keys({
    firstname: Joi.string().min(3).max(20).required(),
    lastname: Joi.string().min(3).max(20).required(),
    username: Joi.string().min(5).max(20).required(),
    scc: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
  updatePasswordSchema: Joi.object().keys({
    id: Joi.string().required(),
    old_password: Joi.string().min(8).required(),
    new_password: Joi.string().min(8).required(),
  }),
};
