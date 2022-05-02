const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const middlewares = require("../../common/middlewares");
const { registerSchema, loginSchema } = require("./auth.validation");
router.post("/register",
    middlewares.validateInput(registerSchema, "body"),
    authController.register);
router.post("/login",
    middlewares.validateInput(loginSchema, "body"),
    authController.login)

module.exports = router;