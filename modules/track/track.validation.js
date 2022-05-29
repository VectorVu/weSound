const Joi = require("joi");

const createTrackSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .max(100)
        .required(),
    streamUrl: Joi.string()
        .pattern(new RegExp('mp3$'))
        .required(),
    imageUrl: Joi.string()
        .pattern(new RegExp('^http'))
        .required(),
    author: Joi.string()
        .min(1)
        .max(70)
        .required(),
    genre: Joi.string()
})
const updataTrackSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .max(100),
    streamUrl: Joi.string(),
    imageUrl: Joi.string(),
    streamable: Joi.boolean()
})
module.exports = {
    createTrackSchema,
    updataTrackSchema
}