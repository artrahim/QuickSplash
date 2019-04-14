
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

// returns the total wins of a player
async function getWins(username) {
    let tWins = null;
    let infoQ = {'username': username};
    await PlayerInfo.findOne(infoQ, 'tWins').then(function(stats){
        console.log('wins:' + stats.tWins);
        tWins = stats.tWins;
    });
    return tWins;

}

// returns the total points of a player
async function getPoints(username) {
    let tPoints = null;
    let infoQ = {'username': username};
    await PlayerInfo.findOne(infoQ, 'tPoints').then(function(stats){
        console.log('tPoints:' + stats.tPoints);
        tPoints = stats.tPoints;
    });
    return tPoints;
}

// returns the total points of a player
async function getGamePlayed(username) {
    let tGamePlayed = null;
    let infoQ = {'username': username};
    await PlayerInfo.findOne(infoQ, 'tGamePlayed').then(function(stats){
        console.log('tGamePlayed:' + stats.tGamePlayed);
        tGamePlayed = stats.tGamePlayed;
    });
    return tGamePlayed;
}

// returns the email of a player
async function getEmail(username) {
    let email = null;
    let infoQ = {'username': username};
    await PlayerInfo.findOne(infoQ, 'email').then(function(stats){
        console.log('email:' + stats.email);
        email = stats.email;
    });
    return email;
}

// returns the email of a player
async function getFname(username) {
    let fname = null;
    let infoQ = {'username': username};
    await PlayerInfo.findOne(infoQ, 'fname').then(function(stats){
        console.log('fname:' + stats.fname);
        fname = stats.fname;
    });
    return fname;
}

// returns the email of a player
async function getLname(username) {
    let lname = null;
    let infoQ = {'username': username};
    await PlayerInfo.findOne(infoQ, 'lname').then(function(stats){
        console.log('lname:' + stats.lname);
        lname = stats.lname;
    });
    return lname;
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


module.exports = {
    getRandomQuestion,
    updatePoints,
    updateWins,
    updateGamePlayed,
    getWins,
    getPoints,
    getGamePlayed,
    getEmail,
    getFname,
    getLname

};