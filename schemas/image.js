const Joi = require("joi");

module.exports = {
  uploadImageSchema: Joi.object().keys({
    title: Joi.string().min(8).required(),
    description: Joi.string().min(15).required(),
    date: Joi.date().required(),
  }),
};
