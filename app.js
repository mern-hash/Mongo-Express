const express = require('express');
const app = express();
const session = require('express-session');
//const MongoDBSession = require('connect-mongodb-session')(session);
//const mongoURI = "mongodb://localhost:27017/sessions";
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const studentRoute = require('./api/routes/student');
const facultyRoute = require('./api/routes/faculty');
const userRoute = require('./api/routes/user');
const fileUpload = require('express-fileupload');
var cookieParser = require("cookie-parser");
var User1 = require('./api/model/User1');

// mongoose.connect('mongodb+srv://auser:auser12345@sbs.5ww4u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
// mongoose.connection.on('error',err=>{
//     console.log('connection failed');
// });

// mongoose.connection.on('connected',connected=>{
//     console.log('connected with database');
// });




app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/student',studentRoute)
app.use('/faculty',facultyRoute)
app.use('/user',userRoute)
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)
app.use('/uploads', express.static('uploads'))
app.use(fileUpload({
    useTempFiles:true

}))


// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:'app is running'
//     })
// })


//connection from refrences videos

// mongoose.connect(mongoURI,{
//     useUnifiedTopology:true,
//     useNewUrlParser:true,
//     useCreateIndex:true,

// })
// .then((res) => {
//     console.log("Mongo connected");
    
//   })


//connection from stack overflow syntax
// mongoose.connect('mongodb://localhost:27017/sessions', {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => console.log('MongoDB Connected...'))
//     .catch((err) => console.log(err))

// const store = new MongoDBSession({
// uri:'mongoURI',
// collection:'mySessions',
// })




// app.use(
//     session({
// secret: 'key that will sign cookie',
// resave:false,
// saveUninitialized:false,
// store:store,

// }))




// app.get("/",(req,res)=>{
//     req.session.isAuth =true;
//     console.log(req.session)
//     console.log(req.session.id)
//     res.send ('session is running')
// })


app.use(cookieParser());


app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);


app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});


var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};


app.get("/", sessionChecker, (req, res) => {
  res.redirect("/login");
});


app
  .route("/signup")
  .get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + "/public/signup.html");
  })
  .post((req, res) => {

    var User1 = new User({
      username: req.body.username,
      email: req.body.email,
      password:req.body.password,
    });
    User1.save((err, docs) => {
      if (err) {
        res.redirect("/signup");
      } else {
          console.log(docs)
        req.session.user = docs;
        res.redirect("/dashboard");
      }
    });
  });


app
  .route("/login")
  .get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
  })
  .post(async (req, res) => {
    var username = req.body.username,
      password = req.body.password;

      try {
        var User1 = await User.findOne({ username: username }).exec();
        if(!User1) {
            res.redirect("/login");
        }
        user.comparePassword(password, (error, match) => {
            if(!match) {
              res.redirect("/login");
            }
        });
        req.session.user = user;
        res.redirect("/dashboard");
    } catch (error) {
      console.log(error)
    }
  });


app.get("/dashboard", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.sendFile(__dirname + "/public/dashboard.html");
  } else {
    res.redirect("/login");
  }
});


app.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});


app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});


app.listen(app.get("port"), () =>
  console.log(`App started on port ${app.get("port")}`)
);










module.exports=app;