const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require("./api/routes/products");

const orderRoutes = require("./api/routes/orders");
const studentRoute = require('./api/routes/student');
const facultyRoute = require('./api/routes/faculty');
const userRoute = require('./api/routes/user');
const fileUpload = require('express-fileupload');

mongoose.connect('mongodb+srv://auser:auser12345@sbs.5ww4u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connection.on('error',err=>{
    console.log('connection failed');
});

mongoose.connection.on('connected',connected=>{
    console.log('connected with database');
});

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


app.use((req,res,next)=>{
    res.status(200).json({
        message:'app is running'
    })
})

module.exports=app;