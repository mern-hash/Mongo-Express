const express = require('express');
const router = express.Router();
const checkAuth = require('../config/check-auth');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome')

);

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{
  
  req.session.isAuth =true
  res.render('dashboard',{
    user: req.user
  })
    
  })


module.exports = router;


// router.get('/dashboard', ensureAuthenticated, (req, res) =>
//   res.render('dashboard', {
    
//     user: req.user
//   })
// );

