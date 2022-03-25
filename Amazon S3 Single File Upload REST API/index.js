require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const multer = require("multer");
const uuid = require("uuid");
//aws
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

//middlewares
const app =express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));


//storage for multer
const storage = multer.memoryStorage({

    destination:function (req,file,cb){
        cb(null, '');
    }
    //,
    // filename: function(req,file,cb){
    //     const fileName = file.originalname.replace(' ', '-');
    //     cb(null, fileName + '-' + Date.now())
    // }
});

//middlewares
const uploadOptions =multer({storage: storage}).single('image');



//will take input files as form data and upload to s3 bucket
app.post("/upload", uploadOptions ,(req,res)=>{

    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length-1]

    //console.log(req.file);
    //res.status(200).json("Processed. Check console")

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }


    s3.upload(params, (error, data)=>{
        if(error){
            res.status(500).json(error);
        }

        res.status(200).json(data);
    })

});



//Server 
app.listen(process.env.PORT ||5000, (req,res)=>{

    console.log("Server running on port 5000")

});
