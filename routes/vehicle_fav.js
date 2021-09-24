const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const vehiclefavController = require('../controllers/vehicle_fav')
const auth = require('../middleware/auth')
// const {isLoggedIn,isAuthor,validateCampground} = require('../middleware');

router.route('/')
    .post(auth,catchAsync(vehiclefavController.store));

router.route('/:id')
    .delete(auth,catchAsync(vehiclefavController.delete));

module.exports = router;