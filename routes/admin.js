const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { forwardAuthenticated } = require('../config/auth');

const User = require('../models/User');

//const Student = require('../models/student');
const checkAuth = require('../config/check-auth');

const mongoose = require('mongoose');
















router.get('/', (req, res,next) => {
      
      
    res.render('admin')});




    module.exports= router;