const Joi = require("joi");

module.exports = {
  addSccSchema: Joi.object().keys({
    name: Joi.string().min(5).required(),
    description: Joi.string().min(10).required(),
    category: Joi.string().required(),
  }),

  updateSccSchema: Joi.object().keys({
    name: Joi.string().min(5).required(),
    description: Joi.string().min(10).required(),
    category: Joi.string().required(),
  }),

};
