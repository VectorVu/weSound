const express = require("express");

const router = express.Router();
const commentController = require("./comment.controller");
router.post("/", commentController.createComment);
router.get("/:commentId", commentController.readComment);
router.put("/:commentId", commentController.updateComment);
router.delete("/:commentId",commentController.deleteComment);
module.exports = router;