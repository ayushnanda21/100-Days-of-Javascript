require('dotenv').config()
const express= require("express");
const multer = require("multer"); 
const ejs= require("ejs"); //embedded js template engine
const path = require("path"); //inbuilt pathmodule

//set storage engine
const storage = multer.diskStorage({

    destination: './public/uploads/',
    filename: function(req,file,cb){     //cb is callback
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    }

});

//intialize upload
const upload = multer({
    storage : storage, 
    limits: {fileSize: 1000000},
    fileFilter : function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('myImage');

//check file type
function checkFileType(file,cb){
    //allowed file extensions
    const filetypes = /jpeg|jpg|png|gif/;
    //check extensions
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else{
        cb('Error: Images Only');
    }

}

const app  =express();

//ejs
app.set('view engine', 'ejs');

//public static folder
app.use(express.static('./public'));

app.get("/", function(req,res){

    res.render('index', {msg:''});
})



//intiazing post
app.post("/upload", function(req,res){

    upload(req,res,function(err){
        if(err){
            res.render('index',{ msg : err });
        } else{
            if(req.file == undefined){
                res.render('index', {msg: 'Error: No file selected'});
            }
            else{
                res.render('index',{
                    msg: 'Image uploaded',
                    file: `uploads/${req.file.filename}`
                });
            
        }
    }
    });


});









//Listening port
app.listen(process.env.PORT || 5000 , function(req,res){

    console.log("Server is running on port 5000");

})