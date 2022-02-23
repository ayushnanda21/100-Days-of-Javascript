//jshint esversion:6

const express = require("express");

const app = express();        //function that express module.

app.get("/", function(req,res){

    res.send("Hello world");

});


app.listen(3000,function(){
    console.log("Server started on port 3000");
});