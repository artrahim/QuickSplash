import React, { Component } from 'react';
import {socket} from '../Router';
import $ from 'jquery';

import Logo from "../Game/Utilities/Logo";

class Waiting extends Component {

    componentDidMount(){

        const lobbyCode = this.props.lobbyCode;

        $('#button').click(function(){
            socket.emit('startGame', lobbyCode);
        });

    }

    render() {
        let button = null;
        let text = null;
        const isCreator = this.props.isCreator;
        const isStarted = this.props.isStarted;
        if (!isStarted){
            if (isCreator){
                button = <img id="button" src={ require('../Assets/images/blueSplash.png') } alt="button" />
            }
            text = "THE GAME TO START"
        }
        else {
            text = "EVERYONE TO ANSWER"
        }

        return (
            <div>
                <title>Create a lobby</title>
                <Logo/>
                <br></br>
                <h1>WAITING FOR {text}...</h1>
                {button}
            </div>
        );
    }

}

export default Waiting;
