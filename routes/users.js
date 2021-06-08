const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');



// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

//Forget Password
router.get('/forgetpassword', forwardAuthenticated, (req, res) => res.render('forgetpassword'));

//Update profile
router.get('/update', forwardAuthenticated, (req, res) => res.render('update'));


// Register
router.post('/register', (req, res) => {
  const { name, email,userType, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !userType ||!password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      userType,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          userType,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          userType,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


  router.get('/',(req,res,next)=>{
   
    User.find()
    .then(result=>{

res.status(200).json({

    userData:result
});

    })

    .catch(err=>{

        console.log(err);
        res.status(500).json({

            error:err
        });
    })
})

router.get('/:id',(req,res,next)=>{
   
    console.log(req.params.id);
    User.findById(req.params.id)
    .then(result=>{

        res.status(200).json({
        
            user:result
        })
        
        })
        .catch(err=>{

            console.log(err);
            res.status(500).json({
    
                error:err
            });

        })

});


router.put('/:id',(req,res,next)=>{

  console.log(req.params.id);
  User.findOneAndUpdate({_id:req.params.id},{
  $set:{

      name:req.body.name,
      password:req.body.password,
      email:req.body.email
      
    
}
      })

      // bcrypt.genSalt(10, (err, salt) => {
      //   bcrypt.hash(User.password, salt, (err, hash) => {
      //     if (err) throw err;
      //     User.password = hash;
      //     User
      //       .save()

      .then(result=>{

          res.status(200).json({

              updated_user:result
          })
      })

  //   })
  // })
     
      .catch(err=>{

   console.log(err);
   res.status(500).json({
  error:err

   })

      })
  })






  router.delete('/:id',(req,res,next)=>{

    User.remove({_id:req.params.id})
    .then(result=>{
    
        
        res.status(200).json({
    
            message:'User deleted',
            result:result
        })
    })
    
    .catch(err=>{
    
        
        res.status(500).json ({
    
            error:err
        })
    })
    
    
    })




module.exports = router;
