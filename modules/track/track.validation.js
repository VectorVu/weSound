const Joi = require("joi");

const createTrackSchema = Joi.object({
    title: Joi.string()
        .min(6)
        .max(100)
        .required(),
    streamUrl: Joi.string()
        .required(),
    imageUrl: Joi.string()
        .pattern(new RegExp('^http'))
        .required(),
    author: Joi.string()
        .required()
})
const updataTrackSchema = Joi.object({
    title: Joi.string()
        .min(6)
        .max(100),
    streamUrl: Joi.string(),
    author: Joi.string(),
    imageUrl: Joi.string(), 
    streamable: Joi.boolean()
})
module.exports = {
    createTrackSchema,
    updataTrackSchema
}