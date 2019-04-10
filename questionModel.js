//Require Mongoose
let mongoose = require('mongoose');

// creating a Account Schema and Model
let Schema = mongoose.Schema;
let QuestionsSchema = new Schema(
    {
        question: {type: String, required: true, unique: true},
    }
);

//Export function to create "SomeModel" model class
module.exports = mongoose.model("Questions", QuestionsSchema);
