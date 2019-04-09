//Require Mongoose
let mongoose = require('mongoose');

// creating a Account Schema and Model
let Schema = mongoose.Schema;
let AccountSchema = new Schema(
    {
        fname: {type: String},
        lname: {type: String},
        email: {type: String},
        username: {type: String},
        password: {type: String}
    }
);

module.exports = mongoose.model("Account", AccountSchema);