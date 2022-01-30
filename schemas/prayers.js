const Joi = require("joi");

module.exports = {
  addPrayerSchema: Joi.object().keys({
    title: Joi.string().min(5).required(),
    prayer: Joi.string().min(10).required(),
  }),
  editPrayerSchema: Joi.object().keys({
    _id: Joi.string().required(),
    title: Joi.string().min(5).required(),
    prayer: Joi.string().min(10).required(),
  }),
};
