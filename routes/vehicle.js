const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const vehicleController = require('../controllers/vehicle')
const auth = require('../middleware/auth')
// const {isLoggedIn,isAuthor,validateCampground} = require('../middleware');

const multer = require('multer');
const {storage} = require('../cloudinary')
const upload = multer({storage})
// const upload = multer({dest:'u ploads/'})

router.route('/')
    .get(catchAsync(vehicleController.index))
    .post(auth,upload.array('image'),catchAsync(vehicleController.store));
    // .post(auth,upload.array('image'),validateCampground,catchAsync(vehicleController.store));

// router.get('/new',auth,vehicleController.create);

router.route('/:id')
    // .get(catchAsync(vehicleController.show))
    .put(auth,upload.array('image'),catchAsync(vehicleController.update))
    // .put(auth,isAuthor,upload.array('image'),validateCampground,catchAsync(vehicleController.update))
    .delete(auth,catchAsync(vehicleController.delete));


// router.get('/:id/edit',auth,isAuthor,catchAsync(vehicleController.edit));

module.exports = router;