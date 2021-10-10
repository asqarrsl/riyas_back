const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const partsController = require("../controllers/parts");
const auth = require("../middleware/auth");
// const {isLoggedIn,isAuthor,validateCampground} = require('../middleware');

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
// const upload = multer({dest:'u ploads/'})

router
  .route("/")
  .get(catchAsync(partsController.index))
  .post(auth, catchAsync(partsController.store));

router.route("/user/:sellerId").get(catchAsync(partsController.userParts));
// .post(auth, upload.array("image"), catchAsync(partsController.store));
// .post(auth,upload.array('image'),validateCampground,catchAsync(partsController.store));

// router.get('/new',auth,partsController.create);

router
  .route("/:id")
  .get(catchAsync(partsController.show))
  .put(auth, catchAsync(partsController.update))
  //   .put(auth, upload.array("image"), catchAsync(partsController.update))
  // .put(auth,isAuthor,upload.array('image'),validateCampground,catchAsync(partsController.update))
  .delete(auth, catchAsync(partsController.delete));

// router.get('/:id/edit',auth,isAuthor,catchAsync(partsController.edit));

module.exports = router;
