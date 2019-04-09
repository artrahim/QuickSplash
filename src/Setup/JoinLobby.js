import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {socket} from '../Router';
import $ from 'jquery';

import Logo from '../Game/Utilities/Logo'
import './Lobby.css';

class JoinLobby extends Component {

    constructor() {

        super();
        this.state = {
            started: false,
            nickname: ""
        }

    }

    componentDidMount(){
        $('#button').click(function(){
            socket.emit('joinLobby', $("#joinCode").val(), $("#nickname").val());
        });

        socket.on('failedToJoin', function(){
            alert("Failed to join lobby");
        });

        socket.on('waiting', (nickname) => {
            this.setState(state => ({
              started: true,
              nickname: nickname
            }));
        });

    }

    render() {

        let component = null;
        switch (this.state.started){
            case false:
                component =
                <div>
                    <Logo/>
                    <title>Join a lobby</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet" />
                    <h1>JOIN A LOBBY</h1>
                    <br/>
                    <div id="container">
                        <label htmlFor="joinCode">ENTER A JOIN CODE: </label>
                        <input defaultValue="" type="text" className="textBox" id="joinCode"/>
                        <br/><br/>
                        <label htmlFor="nickname">WHAT SHOULD WE CALL YOU?: </label>
                        <input defaultValue="" type="text" className="textBox" id="nickname"/>
                    </div>
                    <br/>
                    <img id="button" src={ require('../Assets/images/blueSplash.png') } alt="button" />
                </div>
                break;
            case true:
                component = <Redirect to='/game'/>;
                component =
                <Redirect to={{
                    pathname: '/game',
                    state: {
                        isCreator: this.props.location.state.isCreator,
                        nickname: this.state.nickname
                    }
                }}/>
                break;
            default:
                break;
        }

        return (
            <div>
                {component}
            </div>
        );

    }
}

export default JoinLobby;
