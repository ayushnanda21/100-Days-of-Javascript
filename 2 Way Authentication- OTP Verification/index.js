//Acquiring modules
require('dotenv').config()
const express= require("express");
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const exphbs = require("express-handlebars");

const app =express();

//view engine(handlebars setup)
app.engine('handlebars',exphbs.engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ "}));
app.set('view engine','handlebars');


//using body parser
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//connecting static folder
app.use('/public',express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
    res.render('contact');
});


//transporter
var email; //global (for sending and for re-sending otp)

let transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',

    auth:{
        user: '',
        pass: '',
    }

});

//generating otp
var otp = Math.random();
otp = otp*1000000;
otp = parseInt(otp);
console.log(otp);


//otp sending function
app.post('/send', function(req,res){

    email =req.body.email;

    //send mail with transport
    var mailOptions = {
        to: req.body.email,
        subject: "Otp for registration is :",
        html: "<h3>OTP for account verification is : </h3>" + "<h1 style='font-weight: bold;'>" + otp +"</h1>"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('otp');
    });


});

//resending otp
app.post('/resend',function(req,res){
    var mailOptions={
        to: email,
       subject: "Otp for registration is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('otp',{msg:"otp has been sent"});
    });

});

//otp verification
app.post('/verify', function(req,res){

    if(req.body.otp ==otp){
        res.send("You have been successfully registered");
    } else{
        res.send('otp',{msg: 'otp is incorrect'});
    }
});


//server port
app.listen(process.env.PORT || 3000 , function(req,res){

    console.log("Server is running on port 3000");
});