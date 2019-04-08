const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, '/public')));

var rooms = [];
var codes = [];
var currentRoom = -1;

let mongoose = require('mongoose');

// set up default conn with the password
let db = 'mongodb+srv://A:ABCd1234!@quicksplash-db-dmuwu.mongodb.net/test?retryWrites=true';
mongoose.connect(db, {useNewUrlParser: true});
let qpDB = mongoose.connection;

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

let Account = mongoose.model("Account", AccountSchema);


io.on('connection', function(socket){

    console.log("user connected");

    socket.on("login", function (loginInfo) {

        logObj = JSON.parse(loginInfo);
        let username = logObj.username;
        let password = logObj.password;

        // query db for Account
        let auth = false;

        // find all athletes who play tennis, selecting the 'name' and 'age' fields
        Account.findOne({'username': username}, 'password', function (err,account) {
            if (err) {
                // emit Login Failed
                return handleError(err);
            }

            console.log(account.password);


            if (password === account.password){
                socket.emit('login-success');
            }else{
                socket.emit('login-fail');
            }


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

        // create and add new account to db
        let newAccount = new Account({
            fname: fname,
            lname: lname,
            email: email,
            username: username,
            password: password
        });

        newAccount.save(function (err) {
            if (err) return "You Fucked up!";

        });


    });



	socket.on('createLobby', function(ruleSet){
        while (true) {
    		var duplicate = false;
    		var generatedCode = (Math.floor((Math.random() * 1000))).toString(10);
    		for (var i=0; i < codes.length; i++){
    			if (codes[i].localeCompare(generatedCode) == 0){
    				duplicate = true;
    			}
    		}
    		if (!duplicate){
                codes.push(generatedCode);
    			break;
    		}
        }
        currentRoom++;
        var room = {
            name: "name" + currentRoom,
            code: generatedCode,
            rules: ruleSet,
            players: []
        }
        rooms.push(room);
        socket.join(room.name);
        console.log("***************");
        console.log("Created a lobby");
        console.log("Join code: " + room.code);
    });

    socket.on('joinLobby', function(joinCode, nickname){
        var joined = false
        for (var i=0; i < rooms.length; i++){
            if (joinCode.localeCompare(rooms[i].code) == 0){
                joined = true;
                rooms[i].players.push(nickname);
                socket.join(rooms[i].name);
                console.log("***************");
                console.log(nickname + " joined " + rooms[i].name);
            }
        }
        if (!joined){
            socket.emit('error', "hamzah");
        }
    });

    socket.on('game', function(room){

    });

	//actions to be taken when a user disconnects
	socket.on('disconnect', function(socket){
        console.log("user disconnected");
	});

});


//Bind connection to error event (to get notification of connection errors)
qpDB.on('error', console.error.bind(console, 'MongoDB connection error:'));


http.listen(port, function(){
	console.log('listening on *:' + port);
});
