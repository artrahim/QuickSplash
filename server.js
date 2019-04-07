var path = require('path')
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '/public')));

var rooms = [];
var codes = [];
var currentRoom = -1;

io.on('connection', function(socket){

    console.log("user connected");

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

http.listen(port, function(){
	console.log('listening on *:' + port);
});
