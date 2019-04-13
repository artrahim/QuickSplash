const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const dbUtil = require('./dbUtils');
const port = process.env.PORT || 5000;
//app.use(express.static(path.join(__dirname, '/public')));

var rooms = [];
var codes = [];
var usernames = [];
var currentRoom = -1;

let mongoose = require('mongoose');

// set up default conn with the password
let db = 'mongodb+srv://A:ABCd1234!@quicksplash-db-dmuwu.mongodb.net/test?retryWrites=true';
mongoose.connect(db, {useNewUrlParser: true});
let qpDB = mongoose.connection;

// getting a PlayerInfo Schema and Model
let PlayerInfo = require('./PlayerInfoModel');


io.on('connection', function (socket) {

    console.log("user connected");

    socket.on("login", function (loginInfo) {

        logObj = JSON.parse(loginInfo);
        let username = logObj.username;
        let password = logObj.password;

        // console.log(logObj);

        // query db for PlayerInfo
        let auth = false;

        // find all athletes who play tennis, selecting the 'name' and 'age' fields
        PlayerInfo.findOne({'username': username}, 'password', function (err, account) {
            if (err) {
                console.log("<<<<Hakuna Matata>>>>");
                // emit Login Failed
                return handleError(err);
            }

            console.log(account);

            if (account !== null && password === account.password)
                socket.emit('login-success');
            else
                socket.emit('login-fail');

        });

    });

    socket.on("signUp", function (signUpInfo) {
        console.log(signUpInfo);

        logObj = JSON.parse(signUpInfo);
        let fname = logObj.fname;
        let lname = logObj.lname;
        let email = logObj.email;
        let username = logObj.username;
        let password = logObj.password;

        // do input sanitization

        PlayerInfo.findOne({'username': username}, username, function (err, account) {
            if (err) {
                console.log("ERROR PLZ LEAVE.")
                return handleError(err);
            }

            console.log(account);

            // New PlayerInfo -
            if (account === null) {
                // create and add new account to db
                let newAccount = new PlayerInfo({
                    fname: fname,
                    lname: lname,
                    email: email,
                    username: username,
                    password: password,
                    tWins : 0,
                    tPoints: 0,
                    tGamePlayed: 0
                });

                newAccount.save(function (err) {
                    if (err) return "You Fucked up!";
                });

                socket.emit('signUp-success');
            } else {
                socket.emit('signUp-fail');
            }
        });


    });

    //actions to be taken when a user creates a lobby
    socket.on('createLobby', function (ruleSet) {

        //generate a join code and make sure it's unique
        while (true) {
            var duplicate = false;
            var generatedCode = (Math.floor((Math.random() * 1000))).toString(10);
            for (var i = 0; i < codes.length; i++) {
                if (codes[i].localeCompare(generatedCode) === 0) {
                    duplicate = true;
                }
            }
            if (!duplicate) {
                codes.push(generatedCode);
                break;
            }
        }

        //set the variables for the created lobby
        currentRoom++;
        var room = {
            name: "room" + currentRoom,
            code: generatedCode,
            rules: ruleSet,
            currentRound: 0,
            players: [],
            questions: [],
            isStarted: false
        };

        //add the lobby to the list of lobbies
        rooms.push(room);

        //add the user to the lobby they just created
        //socket.join(room.name);
        socket.emit('joinAsCreator', generatedCode);

        //debugging/logging statements
        console.log("***************");
        console.log("Created a lobby");
        console.log("Join code: " + room.code);
        console.log(room.rules)

    });

    //actions to be taken when a user joins a lobby
    socket.on('joinLobby', function (joinCode, nickname, username) {

        let errorMessage = "Please check your join code and try again";
        //compare the join code entered by the user to the join codes of all
        //the lobbies on the server
        //if a match is found, add user to correct lobby
        let correctCode = false;
        let uniqueName = true;
        let hasSpace = false;
        let room = {};
        for (let i = 0; i < rooms.length; i++) {
            if (joinCode === rooms[i].code) {
                correctCode = true;
                room = rooms[i];
                let lobbySize = room.rules.lobbySize;
                if (room.players.length < lobbySize){
                    hasSpace = true; 
                }
                else{
                    errorMessage = "The lobby you tried to join is already full";
                }
            }
        }
        if (correctCode) {
            for (let j = 0; j < room.players.length; j++) {
                if (room.players[j].nickname === nickname) {
                    errorMessage = "Your nickname is not unique. Please change it and try again";
                    uniqueName = false;
                }
            }
        }
        if (uniqueName && correctCode && hasSpace){
            let temp1 = {
                username: username,
                nickname: nickname,
                playerSocketId: socket.id
            };
            usernames.push(temp1);
            let temp2 = {
                nickname: nickname,
                score: 0,
                colour: getColour(),
                playerSocketId: socket.id
            };
            room.players.push(temp2);
            socket.join(room.name);
            console.log('new colour = ' + temp2.colour);
            socket.emit('waiting', temp2.colour);
            io.to(room.name).emit('addPlayers', room.players);
            //debugging/logging statements
            console.log("***************");
            console.log(nickname + " joined " + room.name);
        }
        //send error message if the user fails to join
        else {
            socket.emit('failedToJoin', errorMessage);
        }

    });

    //actions to be taken when a game starts.
    socket.on('startGame', function(code){

        var room = findLobby(code);
        if (room.players.length >= 3) {
            loadQuestions(room);
            // set the game started bool to true
            room.isStarted = true;
        }
        else{
            let errorMessage = "You need at least 3 players to start the game";
            socket.emit('failedToStart', errorMessage);
        }


    });

    function loadQuestions(room){
        // get random question here
        let questionList = ["DD"];

        //retrieve all the required questions
        //For N players, N questions are needed per round
        //So total number of questions needed = N * number of rounds
        dbUtil.getRandomQuestion(room.players.length * room.rules.numRounds).then((retQuestion)=> {
            questionList = retQuestion;
            console.log("-----------------------LOADED-------------------!");
            // emit socket event to set the question
            console.log(questionList);
            init(room, questionList);
        });
    }

    function init(room, questionList) {
        room.currentRound++;
        io.to(room.name).emit('roundTransition');
        setTimeout(function(){
            sendQuestions(room, questionList);
        }, 3000);
    }

    function sendQuestions(room, questionList){
        room.questions = [];
        let players = io.sockets.adapter.rooms[room.name].sockets;
        let index = 0;
        let timePerRound = room.rules.timePerRound;
        for (let player in players){
            let playerSocket = io.sockets.connected[player];
            let question1 = questionList[index++];
            var question = {
                text: question1,
                answers: []
            };
            room.questions.push(question);
            var numPlayers = Object.keys(players).length;
            if (index === numPlayers){
                index = 0;
            }
            let question2 = questionList[index];
            console.log(room.questions);
            //console.log('1st Question: ' + question1 + '\n' + '2nd Question: ' + question2);

            playerSocket.emit('prompt1', question1, question2, timePerRound);

        }

        var timeUntilVote = ((parseInt(timePerRound, 10) + 2) * 1000);
        setTimeout(function(){
            voting(room);
        }, timeUntilVote);

    }

    // send a prompt2 when a response received
    socket.on('response', function (player, answer, question, code) {
        var room = findLobby(code);
        //find the question in the lobby's list of questions
        //assign answer to said question
        for (var i=0; i<room.questions.length; i++){
            if (room.questions[i].text === question){
                var temp = {
                    nickname: player,
                    text: answer,
                    votes: 0
                };
                room.questions[i].answers.push(temp);
            }
        }
        socket.emit('prompt2');
    });

    // send a waiting screen
    socket.on('response2', function (player, answer, question, code) {
        let room = findLobby(code);
        //find the question in the lobby's list of questions
        //assign answer to said question
        for (let i=0; i<room.questions.length; i++){
            if (room.questions[i].text === question){
                let temp = {
                    nickname: player,
                    text: answer,
                    votes: 0
                };
                room.questions[i].answers.push(temp);
            }
        }
        socket.emit('waiting2');
    });

    socket.on('failedToAnswer', function(player, code, question1, question2){
        let room = findLobby(code);
        for (let i=0; i<room.questions.length; i++){
            if (room.questions[i].text === question1 || room.questions[i].text === question2){
                for (let j=0; j<2; j++){
                    if (room.questions[i].answers[j] === undefined){
                        let temp = {
                            nickname: player,
                            text: "-",
                            votes: 0
                        };
                        room.questions[i].answers[j] = temp;
                        break;
                    }
                }
            }
        }
    });

    function voting(room){
        let offset = 0;
        let answer1;
        let answer2;
        let player1;
        let player2;
        for (let i=0; i<room.questions.length; i++){
            let prompt = room.questions[i].text;
            if (room.questions[i].answers[0] == null) {
                let temp = {
                    nickname: "",
                    text:  "-",
                    votes: 0
                };
                answer1 = temp.text;
            }
            else{
                answer1 = room.questions[i].answers[0].text;
            }
            if (room.questions[i].answers[1] == null) {
                let temp = {
                    nickname: "",
                    text:  "-",
                    votes: 0
                };
                answer2 = temp.text;
            }
            else{
                answer2 = room.questions[i].answers[1].text;
            }
            player1 = room.questions[i].answers[0].nickname;
            player2 = room.questions[i].answers[1].nickname;
            let isLast = false;
            if (i === room.questions.length-1){
                isLast = true;
            }
            sendVote(room, prompt, answer1, answer2, player1, player2, offset, isLast);
            offset += 5000
        }
    }

    function sendVote(room, prompt, answer1, answer2, player1, player2, offset, isLast){
        let timeToVote = room.questions.length * 5;
        setTimeout(function(){
            console.log(prompt);
            io.to(room.name).emit('vote', prompt, timeToVote, answer1, answer2, player1, player2);
            io.to(room.name).emit('reset');
        }, offset);
        if (isLast){
            setTimeout(function(){
                results(room);
            }, (offset+5000));
        }
    }

    socket.on('vote', function(code, question, answer) {
        var room = findLobby(code);
        for (var i=0; i<room.questions.length; i++) {
            if (room.questions[i].text === question) {
                let answers = room.questions[i].answers;
                for (var j = 0; j < answers.length; j++) {
                    if (answers[j].text === answer) {
                        answers[j].votes++;
                        let player = answers[j].nickname;
                        for (var k = 0; k < room.players.length; k++) {
                            if (room.players[k].nickname === player) {
                                room.players[k].score += 100;
                            }
                        }
                    }
                }
            }
        }
    });

    function results(room){
        for (var i=0; i<room.questions.length; i++) {
            console.log(room.questions[i].answers);
        }
        for (var i=0; i<room.players.length; i++){
            console.log(room.players[i]);
        }
        room.players.sort(function(a, b) {
            return b.score - a.score;
        });
        io.to(room.name).emit('result', room.players);
        let numRounds = parseInt(room.rules.numRounds, 10);
        let currentRound = room.currentRound;
        console.log(currentRound);
        console.log(numRounds);
        if (currentRound < numRounds) {
            setTimeout(function () {
                nextRound(room);
            }, 5000);
        }
        else{
            setTimeout(function () {
                endGame(room);
            }, 5000);
        }
    }

    function nextRound(room){
        loadQuestions(room)
    }

    function endGame(room){
        for (let i=0; i<usernames.length; i++){
            dbUtil.updateGamePlayed(usernames[i].username);
        }
        for (let i=0; i<room.players.length; i++){
            let username = getUsername(room.players[i].nickname);
            let score = room.players[i].score;
            dbUtil.updatePoints(username, score);
            if (i === 0){
                dbUtil.updateWins(username);
            }
        }
        io.to(room.name).emit('endGame');
        let index = rooms.indexOf(room);
        rooms.splice(index, 1);
        console.log(rooms);
    }

    function findLobby(code){
        //uses the code passed from the player to determine the correct lobby
        var room = {};
        for (var i=0; i < rooms.length; i++){
            if (rooms[i].code.localeCompare(code) === 0){
                room = rooms[i];
                rooms[i].isStarted = true;
            }
        }
        return room;
    }

    // finds the players lobby and returns the index of the room if the player hasn't jioned a r
    // if the player hasn't joined returns -1
    function findPlayerLobby(socketId) {
        let roomId = -1;
        console.log(rooms.length);
        for (let i=0; i < rooms.length; i++) {
            for (let j=0; j < rooms[i].players.length; j++){
                console.log('Players socketID' + rooms[i].players[j].playerSocketId +"The socket ID" + socketId);
                if(rooms[i].players[j].playerSocketId === socketId) {
                    roomId = i;
                }
            }
        }
        return roomId;
    }

    function getUsername(nickname){
        let username = "";
        for (let i=0; i<usernames.length; i++){
            if (usernames[i].nickname === nickname){
                username = usernames[i].username;
            }
        }
        return username;
    }

    function getColour() {
        let rn = Math.floor(Math.random() * Math.floor(8));  // will generate a random num from 0 to 7
        let colour = '';

        switch (rn) {

            case 0:
                colour = 'blueSplashPlayer';
                break;
            case 1:
                colour = 'tealSplashPlayer';
                break;
            case 2:
                colour = 'yellowSplashPlayer';
                break;
            case 3:
                colour = 'orangeSplashPlayer';
                break;
            case 4:
                colour = 'redSplashPlayer';
                break;
            case 5:
                colour = 'greenSplashPlayer';
                break;
            case 6:
                colour = 'purpleSplashPlayer';
                break;
            case 7:
                colour = 'pinkSplashPlayer';
                break;
            default:
                colour = 'redSplashPlayer';

        }
        return colour;
    }

    //actions to be taken when a user disconnects
    socket.on('disconnect', function () {
        console.log("user disconnected with the following socket id: " + socket.id);
        // find out which player discounted
        let roomIndex = findPlayerLobby(socket.id);
        if (roomIndex != -1) {
            // remove this player form this room
            for( let i = 0; i < rooms[roomIndex].players.length; i++) {
                if ( rooms[roomIndex].players[i].playerSocketId === socket.id) {
                    rooms[roomIndex].players.splice(i, 1);
                }
            }
            // remove this player from username
            for (let i =0; i < usernames.length; i++) {
                if(usernames[i].playerSocketId === socket.id) {
                    usernames.splice(i,1);
                }
            }

            // check the number of players in this room
            if(rooms[roomIndex].players.length < 3 && rooms[roomIndex].isStarted)
            {
                // kill this room
                for( let i = 0; i < rooms[roomIndex].players.length; i++) {
                    io.sockets.connected[rooms[roomIndex].players[i].playerSocketId].disconnect();
                }
            }
        }

        console.log(io.sockets.connected)

    });


});


//Bind connection to error event (to get notification of connection errors)
qpDB.on('error', console.error.bind(console, 'MongoDB connection error:'));


http.listen(port, function () {
    console.log('listening on *:' + port);
});


