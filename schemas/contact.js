const Joi = require("joi");

module.exports = {
  contactSchema: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};
