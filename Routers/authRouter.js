const express = require("express");
const { loginUser, signUpUser } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.route("/signup").post(signUpUser);

authRouter.route("/login").post(loginUser);

module.exports = authRouter;