const express = require('express');
const router = express.Router();

//we need to import this homeController from controller
const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/',homeController.home);

//all the routes for user goes into this user route
router.use('/users',require('./users'));

router.use('/articles',require('./articles'));

// router.use('/likes',require('./likes'));
router.use('/likes', require('./likes')); //Including the Likes route
module.exports = router;