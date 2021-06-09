module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  }
};



// function authUser(req,res,next){

// if (req.userType == ){

// res.status(403)
// return res.send("you do not have a permisson")


// }


// }


// function authType(userType){

// return (req,res,next) => {

// if (req.userType !== userType){
// res.status(401)
// return res.send("Not allowed")

// }

// next()

// }

// }




// module.exports = {authType}



// const isAuth =(req,res,next) =>{

// if (req.session.isAuth){


//   next()
// }
// else{
// redirect('/login')

// }

