const express = require("express");
const router = express.Router();
// const passport = require('passport');
const userController = require("../controllers/user");
const catchAsync = require("../utils/catchAsync");
const auth = require("../middleware/auth");

router.route("/register").post(catchAsync(userController.register));

router.route("/login").post(catchAsync(userController.login));

router.post("/logout", auth, userController.logout);

router.route("/:id").post(auth, catchAsync(userController.updateUser));

module.exports = router;
