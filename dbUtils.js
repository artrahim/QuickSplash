
let mongoose = require('mongoose');

// set up default conn with the password
let db = 'mongodb+srv://A:ABCd1234!@quicksplash-db-dmuwu.mongodb.net/test?retryWrites=true';
mongoose.connect(db, {useNewUrlParser: true});
let qpDB = mongoose.connection;

let Questions = require('./questionModel');

// returns n random question
async function getRandomQuestion(n) {
    let questions = [];
    let randQuestions = [];

    await Questions.find().then(function (doc) {

        doc.forEach(function(element) {
            questions.push(element.question);
        });

        for(let i = 0; i < n; i++) {
            let randNum = Math.floor(Math.random() * questions.length + 0);
            if(!randQuestions.includes(questions[randNum]))
            {
                randQuestions.push(questions[randNum]);
            }else {
                i--;
            }
        }
    });

    return randQuestions;

}
// let a = getRandomQuestion(6).then((a)=>console.log(a));

module.exports = {
    getRandomQuestion,
}