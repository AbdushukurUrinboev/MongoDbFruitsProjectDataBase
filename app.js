let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Why no name"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

let Fruit = mongoose.model("Fruit", fruitSchema);

let Apple = new Fruit({
    name: "Apple",
    rating: 10,
    review: "Pretty solid as a fruid."
});
Apple.save();

let pinaple = new Fruit ({
    name: "Pinaple",
    rating: 9,
    review: "Delicious fruit"

});
pinaple.save();

// fruit.save();

let personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

let Person = mongoose.model("Person", personSchema);

let John = new Person({
    name: "John",
    age: 37,
    favouriteFruit: pinaple
});
John.save();

let David = new Person({
    name: "David",
    age: 30,
    favouriteFruit: Apple
})
David.save();



Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err);
    } else {
        mongoose.connection.close();
        fruits.forEach(function (fruit) {
            console.log(fruit.name);
        });
    }
});

// Fruit.updateOne({_id: "5f28cffa7ab38416802d07e9"}, {name: "Watermelon"}, function(err){
//     if(err) {
//         console.log(err);
//     } else {  
//         console.log("Successfully updated your document");
// }
// });

Fruit.deleteOne({
    name: "Apple"
}, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully deleted your document");
    }
});



Person.deleteMany({
    name: "John"
}, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully deleted your document");
    }
});
