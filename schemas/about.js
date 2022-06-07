const Joi = require("joi");

module.exports = {
  createAboutSchema: Joi.object().keys({
    mission: Joi.string().min(8).required(),
    story: Joi.string().min(15).required(),
  }),
  updateAboutSchema: Joi.object().keys({
    mission: Joi.string().min(8).required(),
    story: Joi.string().min(15).required(),
  }),
};
