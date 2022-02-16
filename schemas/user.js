const Joi = require("joi");

module.exports = {
    subscribeEmailSchema: Joi.object().keys({
        email: Joi.string().email().required(),
    }),
};
