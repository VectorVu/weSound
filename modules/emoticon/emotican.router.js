const express = require("express");
const makeMiddleware = require("multer/lib/make-middleware");
const router = express.Router();
const middlewares = require("../../common/middlewares");
const EmoticanController = require("./emotican.controller");

router.post("/", 
    middlewares.needAuthenticated,
    EmoticanController.addEmotican
);

router.get("/:userId",
    middlewares.needAuthenticated,
    EmoticanController.getAllEmoticanOfUser
);

router.get("/:trackId", EmoticanController.getAllEmoticanOfTrack);

router.delete("/:emoticanId", 
    middlewares.needAuthenticated,
    EmoticanController.deleteEmotican
);

module.exports = router;