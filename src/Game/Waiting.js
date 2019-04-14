import React, {Component} from 'react';
import Cookies from "universal-cookie";
import {socket} from '../Router';
import $ from 'jquery';

import Logo from "../Game/Utilities/Logo";
import ButtonSplash from "./Utilities/ButtonSplash";
import {AllPlayers} from "../Setup/AllPlayers";

import posed from 'react-pose';

import Test from '../Setup/Test'

import {tween, easing, styler, composite, physics} from 'popmotion';
import PlayerSplash from "../Setup/PlayerSplash";

const cookies = new Cookies();

class Waiting extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allPlayers: [],
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            colour: ''
        };
        
        console.log("player in waiting voted " + this.state.allPlayers)

        this.setState({allPlayers: this.props.playersVoted}, function () {
           console.log("set done " + this.state.allPlayers)
        });

    }

    resize() {
        this.setState({
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth
        })
    }


    componentDidMount() {

        this.setState({allPlayers: this.props.playersVoted}, function () {
            console.log("set done " + this.state.allPlayers)
        });

        // this.setState({allPlayers: this.props.playersVoted});

        // console.log("waiting palyers = " + this.props.playersVoted);


        let uname = cookies.get('username').username;
        let nickname = cookies.get('username').nickname;

        console.log("my nickname from cookies = " + nickname);

        window.addEventListener("resize", this.resize.bind(this));

        //const lobbyCode = this.props.lobbyCode;
        const lobbyCode = localStorage.getItem('lobbyCode');

        $('#button').click(function () {
            socket.emit('startGame', lobbyCode);
        });

        socket.on('addPlayers', (players) => {
            this.setState({
                allPlayers: players
            });

            console.log("<<<<shitttt>>>> = " + players[0])

            for (let i = 0; i < players.length; i++) {
                console.log("<<<<player colour >>>>" + players[i].colour);
                if (players[i].nickname === nickname)
                    this.setState({colour: players[i].colour}, function () {
                        console.log('in waiting add colour: ' + this.state.colour);

                        let temp = {
                            username: uname,
                            auth: true,
                            nickname: nickname,
                            colour: this.state.colour
                        };

                        temp = JSON.stringify(temp);
                        let expTime = 15 * 60;
                        console.log("Cookies info in waiting:", temp);
                        cookies.set('username', temp, {path: '/', maxAge: expTime});

                    });
            }

        });

        socket.on('failedToStart', (errorMessage) => {
            alert(errorMessage);
        })
    }

    render() {
        let button = null;
        let text = null;
        let code = null;
        let isCreator = this.props.isCreator;
        let hasStarted = this.props.hasStarted;
        let lobbyCode = localStorage.getItem('lobbyCode');
        if (!hasStarted) {
            code = <h1>CODE: {lobbyCode}</h1>;
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
                {code}
                <h1>WAITING FOR {text}...</h1>
                {button}
                <AllPlayers allPlayers={this.state.allPlayers} width={this.state.windowWidth}
                            height={this.state.windowHeight}/>
            </div>
        );
    }

}

export default Waiting;
