const mongoose  = require('mongoose')

// to connect
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser:true})

//to add items/data

//create schema
const fruitSchema = new mongoose.Schema({

    name: String,
    rating: Number,
    review: String
});

//mongoose.model(collection-name, schema-name)
const Fruit = mongoose.model("Fruit", fruitSchema);

//creating fruit
const fruit = new Fruit({

    name: "Apple",
    rating: 7,
    review: "Apple a day keeps the doctor away"
});

//fruit.save();

//collection 2
const personSchema = new mongoose.Schema({

    name: String,
    age: Number
});

const Person  =  mongoose.model("Person",personSchema);

const person = new Person({

    name: "John",
    age: 37
});

//person.save();

//------------------Adding fruits through insertMany()

const orange = new Fruit({
    name: 'Orange',
    rating: 5,
    review: "too SOur"
});

const banana = new Fruit({
    name: "banana",
    rating: 9,
    review: "Good for gyming"
})

// Fruit.insertMany([orange,banana], function(err){

//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Success!, Fruits added");
//     }
// });

//-----------------------Finding data from database-------------------------------------

Fruit.find(function(err, fruits){

    if(err){
        console.log(err);
    }
    else{
        mongoose.connection.close();
        console.log(fruits);
    }
});