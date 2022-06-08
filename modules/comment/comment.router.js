const express = require("express");
const router = express.Router();
const commentController = require("./comment.controller");
const middlewares = require("../../common/middlewares");
const { createCommentSchema, updateCommentSchema } = require("./comment.validation");

router.post("/",
    middlewares.needAuthenticated,
    middlewares.validateInput(createCommentSchema, "body"),
    commentController.createComment);

router.get("/:commentId",
    middlewares.needAuthenticated,
    commentController.readComment);

router.put("/:commentId",
    middlewares.needAuthenticated,
    middlewares.isCommentPoster,
    middlewares.validateInput(updateCommentSchema, "body"),
    commentController.updateComment);

router.delete("/:commentId",
    middlewares.needAuthenticated,
    middlewares.isCommentPoster,
    commentController.deleteComment);

module.exports = router;