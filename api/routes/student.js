const express = require('express');

const router = express.Router();

const Student = require('../model/student');

const mongoose = require('mongoose');

const student = require('../model/student');

const checkAuth = require('../middleware/check-auth');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
cloud_name:'dnqgs8dbq',
api_key:917776448671352,
api_secret:'kLoh0pBH7IJDhS82Y3Oc5t95fJ0'
})

router.get('/',checkAuth,(req,res,next)=>{
   
    Student.find()
    .then(result=>{

res.status(200).json({

    studentData:result
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
    Student.findById(req.params.id)
    .then(result=>{

        res.status(200).json({
        
            student:result
        })
        
        })
        .catch(err=>{

            console.log(err);
            res.status(500).json({
    
                error:err
            });

        })

});


// router.post('/',(req,res,next)=>{
//     console.log(req.body);
//     const file = req.files.photo;
//     cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{

// console.log(result);

//     });
    
// });



router.post('/',(req,res,next)=>{
   const student = new Student({

_id:new mongoose.Types.ObjectId,
name:req.body.name,
email:req.body.email,
phone:req.body.phone,
gender:req.body.gender

   })

   student.save()
   .then(result=>{

    console.log(result);
    res.status(200).json({

        newStudent:result
    })
})

.catch(err=>{

    console.log(err);
    res.status(500).json ({

        error:err
    })
})

})





router.delete('/:id',(req,res,next)=>{

Student.remove({_id:req.params.id})
.then(result=>{

    
    res.status(200).json({

        message:'Student deleted',
        result:result
    })
})

.catch(err=>{

    
    res.status(500).json ({

        error:err
    })
})


})


router.put('/:id',(req,res,next)=>{

    console.log(req.params.id);
    Student.findOneAndUpdate({_id:req.params.id},{
    $set:{

        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender
}
        })

        .then(result=>{

            res.status(200).json({

                updated_student:result
            })
        })
       
        .catch(err=>{

     console.log(err);
     res.status(500).json({
    error:err

     })

        })
    })






module.exports= router;