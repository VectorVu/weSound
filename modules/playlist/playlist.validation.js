const Joi = require("joi");

const createPlaylistSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .max(100)
        .required(),
    listDescription: Joi.string()
        .min(1)
        .max(300),
    imageUrl: Joi.string()
        .pattern(new RegExp('^http'))
})

const updatePlaylistSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .max(300),
    listDescription: Joi.string()
        .min(1)
        .max(300),
})

module.exports = {
    createPlaylistSchema,
    updatePlaylistSchema
}