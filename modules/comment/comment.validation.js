const Joi = require("joi");

const createCommentSchema = Joi.object({
    content: Joi.string()
        .min(1)
        .max(200)
        .required(),
})

const updateCommentSchema = Joi.object({
    content: Joi.string()
        .min(1)
        .max(200)
})

module.exports = {
    createCommentSchema,
    updateCommentSchema
}