const Joi = require("joi");

const registerSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(2)
        .max(50)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(8)
        .required(),
    repeatPassword: Joi.ref('password'),
    role: Joi.string(),
        // .required(),
    avatarUrl: Joi.string()
        .pattern(new RegExp('^http'))
})
const loginSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(2)
        .max(50)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(8)
        .required(),
})

module.exports = {
    registerSchema,
    loginSchema
}