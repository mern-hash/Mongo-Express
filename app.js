const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const studentRoute = require('./api/routes/student');
const facultyRoute = require('./api/routes/faculty');

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

app.use((req,res,next)=>{
    res.status(200).json({
        message:'app is running'
    })
})

module.exports=app;