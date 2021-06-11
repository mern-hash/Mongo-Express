const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Load User model
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
        
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }


// admin type login




        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            const token = jwt.sign({


              email:email
              
              },
              "this dummy text",{
              
                expiresIn:"1hr"
              }
              
              );
              console.log(token);

              // return res.status(200).json({
              //   message: "Auth successful",
              //   token: token
              // });
              
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );








  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
