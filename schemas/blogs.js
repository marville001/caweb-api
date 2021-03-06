const Joi = require("joi");

module.exports = {
    addBlogSchema: Joi.object().keys({
        title: Joi.string().min(15).required(),
        subtitle: Joi.string().allow(""),
        intro: Joi.string().max(150).allow(""),
        slug: Joi.string().required(),
        image: Joi.string().allow(""),
        author: Joi.string().required(),
        blog: Joi.string().min(50).required(),
        active: Joi.boolean().allow(""),
        allowComments: Joi.boolean().allow(""),
        isDraft: Joi.boolean().allow(""),
        publishDate: Joi.string().allow(""),
    }),

    updateBlogSchema: Joi.object().keys({
        title: Joi.string().min(15).required(),
        subtitle: Joi.string().allow(""),
        intro: Joi.string().max(150).allow(""),
        slug: Joi.string().required(),
        image: Joi.string().allow(""),
        author: Joi.string().required(),
        blog: Joi.string().min(50).required(),
        active: Joi.boolean().allow(""),
        allowComments: Joi.boolean().allow(""),
        isDraft: Joi.boolean().allow(""),
        publishDate: Joi.string().allow(""),
    }),
};
