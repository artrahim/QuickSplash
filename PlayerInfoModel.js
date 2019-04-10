//Require Mongoose
let mongoose = require('mongoose');

// creating a PlayerInfo Schema and Model
let Schema = mongoose.Schema;
let PlayerInfoSchema = new Schema(
    {
        fname: {type: String},
        lname: {type: String},
        email: {type: String},
        username: {type: String},
        password: {type: String},
        tWins : {type: Number},
        tPoints: {type: Number},
        tGamePlayed: {type: Number}
    }
);

module.exports = mongoose.model("PlayerInfo", PlayerInfoSchema);