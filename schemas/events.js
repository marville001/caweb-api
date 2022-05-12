const Joi = require("joi");

module.exports = {
  addEventSchema: Joi.object().keys({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(10).required(),
    group: Joi.string().required(),
    date: Joi.string().required(),
  }),

  updateEventSchema: Joi.object().keys({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(10).required(),
    group: Joi.string().required(),
    date: Joi.string().required(),
  }),

};
