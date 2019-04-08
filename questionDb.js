let mongoose = require('mongoose');

// set up default conn with the password
let db = 'mongodb+srv://A:ABCd1234!@quicksplash-db-dmuwu.mongodb.net/test?retryWrites=true';
mongoose.connect(db, {useNewUrlParser: true});
let qpDB = mongoose.connection;

// creating a Account Schema and Model
let Schema = mongoose.Schema;
let QuestionsSchema = new Schema(
    {
        question: {type: String, required: true, unique: true}
    }
);

let Questions = mongoose.model("Questions", QuestionsSchema);

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream("./src/Assets/questions/prompts.txt")
});

lineReader.on('line', function (line) {
    console.log(line);
    // create and add new account to db
    let newQuestion = new Questions({
        question: line
    });

    newQuestion.save(function (err) {
        if (err) return "You Fucked up!";
    });
});
