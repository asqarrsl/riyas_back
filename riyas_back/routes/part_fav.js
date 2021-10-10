const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const partfavController = require("../controllers/parts_fav");
const auth = require("../middleware/auth");
// const {isLoggedIn,isAuthor,validateCampground} = require('../middleware');

router
  .route("/")
  .get(auth, catchAsync(partfavController.index))
  .post(auth, catchAsync(partfavController.store));

router
  .route("/part/:part")
  .get(auth, catchAsync(partfavController.checkfavpart));

router.route("/:id").delete(auth, catchAsync(partfavController.delete));

module.exports = router;
