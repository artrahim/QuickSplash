import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import {socket} from '../Router';
import $ from 'jquery';

import Logo from '../Game/Utilities/Logo'
import './Lobby.css';

class JoinLobby extends Component {

    componentDidMount(){
        $('#button').click(function(){
            socket.emit('joinLobby', $("#joinCode").val(), $("#nickname").val());
        });

        socket.on('failedToJoin', function(name){
            alert("Failed to join lobby");
        });

    }

    render() {
        return (
            <div>
                <Logo/>
                <title>Join a lobby</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet" />
                <h1>JOIN A LOBBY</h1>
                <br />
                <div id="container">
                    <label htmlFor="joinCode">ENTER A JOIN CODE: </label>
                    <input defaultValue="" type="text" className="textBox" id="joinCode"/>
                    <br /><br />
                    <label htmlFor="nickname">WHAT SHOULD WE CALL YOU?: </label>
                    <input defaultValue="" type="text" className="textBox" id="nickname"/>
                </div>
                <br/>
                <img id="button" src={ require('../Assets/images/blueSplash.png') } alt="button" />
            </div>
        );
    }
}

export default JoinLobby;
