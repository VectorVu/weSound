const express = require("express");
const router = express.Router();
const commentController = require("./comment.controller");
const middlewares = require("../../common/middlewares");
const { createCommentSchema, updateCommentSchema } = require("./comment.validation");

router.post("/:trackId",
    middlewares.needAuthenticated,
    middlewares.validateInput(createCommentSchema, "body"),
    commentController.createComment);

router.get("/comment/:commentId",
    middlewares.needAuthenticated,
    commentController.readComment);
router.get("/:trackId", commentController.readCommentsOfATrack);
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