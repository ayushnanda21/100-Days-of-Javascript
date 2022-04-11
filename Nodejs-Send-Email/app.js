require("dotenv").config();
const express = require("express");
const bodyParser  =require("body-parser");
const nodemailer = require("nodemailer");

//middlewares
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


//Setting up server
const port = 5000;
app.listen(process.env.PORTENV || `${port}` , (req,res)=>{
    console.log("Server is running on port");
});

var email;

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "",
      pass: ""
    }
  });

app.post('/send' , function (req,res){
    console.log("Sending email...");

    email = req.body.email;

    const message = {
        from: "smtp.mailtrap.io",
        to: email,
        subject: "Testing",
        text: "Mail received successfully using nodejs"
    };

    transport.sendMail(message,  (err,info)=>{
        if(err){
            console.log(err);
        } else{
            console.log('Mail sent'  +  info.response);
            
        }
    })
})

