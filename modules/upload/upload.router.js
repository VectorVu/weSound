const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadController = require("./upload.controller");
const middlewares = require("../../common/middlewares");
const memoryStorage = multer.memoryStorage()
const uploadWithMemoryStorage = multer({ storage: memoryStorage })

router.post("/",
    middlewares.needAuthenticated,
    uploadWithMemoryStorage.single('file'),
    uploadController.uploadToCloud
);

module.exports = router;