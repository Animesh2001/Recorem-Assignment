const express = require('express');

const router = express.Router();
const passport=require('passport');

const articlesController =require('../controllers/articles_controller');
router.post('/create',passport.checkAuthentication,articlesController.create);

module.exports=router;