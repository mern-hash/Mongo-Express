const express = require('express')

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'app faculty is get running'
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'app faculty is post running'
    })
})

module.exports= router;