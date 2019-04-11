import React, { Component } from 'react';
import {socket} from '../Router';
import $ from 'jquery';

import Timer from './Utilities/Timer';
import Logo from "../Game/Utilities/Logo";
import ButtonSplash from "./Utilities/ButtonSplash";

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
        const hasStarted = this.props.hasStarted;
        if (!hasStarted){
            if (isCreator){
                // button = <img id="button" src={ require('../Assets/images/blueSplash.png') } alt="button" />
                button = <div id = "button"><ButtonSplash imagesource={require('../Assets/images/blueSplash.png')} text={"Start"}/></div>
            }
            text = "THE GAME TO START"
        }
        else {
            text = "EVERYONE TO ANSWER"
        }

        return (
            <div className="game">
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
