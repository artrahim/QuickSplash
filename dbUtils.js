
let mongoose = require('mongoose');

// set up default conn with the password
let db = 'mongodb+srv://A:ABCd1234!@quicksplash-db-dmuwu.mongodb.net/test?retryWrites=true';
mongoose.connect(db, {useNewUrlParser: true});
let qpDB = mongoose.connection;

let Questions = require('./questionModel');
let PlayerInfo = require('./PlayerInfoModel');

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

// updating fields
function updatePoints(username, points) {
    let infoQ = {'username': username};
    PlayerInfo.findOne(infoQ, 'tPoints', function (err, stats) {
        if (err) {
            console.log("<<<<Hakuna Matata>>>>");
            // emit Login Failed
            return handleError(err);
        }

        console.log(stats);
        stats.tPoints = stats.tPoints + points;
        stats.save(function () {
            console.log('Updated the score to ', stats.tPoints);
        });
    });
}

function updateWins(username) {
    let infoQ = {'username': username};
    PlayerInfo.findOne(infoQ, 'tWins', function (err, stats) {
        if (err) {
            console.log("<<<<Hakuna Matata>>>>");
            // emit Login Failed
            return handleError(err);
        }

        console.log(stats);
        stats.tWins = stats.tWins + 1;
        stats.save(function () {
            console.log('Updated the Wins to ', stats.tWins);
        });
    });
}

function updateGamePlayed(username) {
    let infoQ = {'username': username};
    PlayerInfo.findOne(infoQ, 'tGamePlayed', function (err, stats) {
        if (err) {
            console.log("<<<<Hakuna Matata>>>>");
            console.log(err);
        }

        console.log(stats);
        stats.tGamePlayed = stats.tGamePlayed + 1;
        stats.save(function () {
            console.log('Updated the number of games played to ', stats.tGamePlayed);
        });
    });
}

// updatePoints('ds', 10000);
// updateWins('ds');
// updateGamePlayed('ds');

module.exports = {
    getRandomQuestion,
    updatePoints,
    updateWins,
    updateGamePlayed

};