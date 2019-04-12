import React, {Component} from 'react';
import {socket} from '../Router';
import $ from 'jquery';

import Timer from './Utilities/Timer';
import Logo from "../Game/Utilities/Logo";
import ButtonSplash from "./Utilities/ButtonSplash";

import {AllPlayers} from "../Setup/AllPlayers";

class Waiting extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allPlayers: props.players,
            splash: ''
        };

    }

    // static assingColour() {
    //     let rn = Math.floor(Math.random() * Math.floor(5));  // will generate a rannd num from 0 to 4
    //     let path = '';
    //
    //     switch (rn) {
    //
    //         case 0:
    //             path = 'blueSplash';
    //             break;
    //         case 1:
    //             path = 'brownSplash';
    //             break;
    //         case 2:
    //             path = 'greenSplash';
    //             break;
    //         case 3:
    //             path = 'orangeSplash';
    //             break;
    //         case 4:
    //             path = 'redSplash';
    //             break;
    //         default:
    //             path = 'blueSplash';
    //
    //     }
    //     return path;
    // }

    componentDidMount() {

        const lobbyCode = this.props.lobbyCode;

        $('#button').click(function () {
            socket.emit('startGame', lobbyCode);
        });

        socket.on('addPlayers', (players, colour) => {
            console.log("collor = " + colour)
            this.setState({allPlayers: players, splash: colour})
        })
    }

    render() {
        let button = null;
        let text = null;
        const isCreator = this.props.isCreator;
        const hasStarted = this.props.hasStarted;
        if (!hasStarted) {
            if (isCreator) {
                // button = <img id="button" src={ require('../Assets/images/blueSplash.png') } alt="button" />
                button = <div id="button"><ButtonSplash imagesource={require('../Assets/images/blueSplash.png')}
                                                        text={"Start"}/></div>
            }
            text = "THE GAME TO START"
        } else {
            text = "EVERYONE TO ANSWER"
        }

        return (
            <div className="game">
                <title>Create a lobby</title>
                <Logo/>
                <br/>
                <h1>WAITING FOR {text}...</h1>
                {button}

                <AllPlayers allPlayers={this.state.allPlayers} splashColour={this.state.splash}/>

            </div>
        );
    }

}

export default Waiting;
