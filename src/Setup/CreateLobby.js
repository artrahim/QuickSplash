import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {socket} from '../Router';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';


import Logo from '../Game/Utilities/Logo';
import './Lobby.css';
import ButtonSplash from "../Game/Utilities/ButtonSplash";

class CreateLobby extends Component {

    constructor() {

        super();
        this.state = {
            lobbyCreated: false,
            loobyCode : null
        }

    }

    componentDidMount() {

        let rules = {
            timePerRound: $("#slider1").val(),
            numRounds: $("#slider2").val(),
            lobbySize: $("#slider3").val(),
            afkTimeout: $("#slider4").val()
        };
        $(".slider").on("input", function () {
            $("#timePerRound").val($("#slider1").val() + " SECONDS");
            $("#numRounds").val($("#slider2").val() + " ROUND(S)");
            $("#lobbySize").val($("#slider3").val() + " PLAYERS");
            $("#afkTimeout").val($("#slider4").val() + " MINUTE(S)");
            rules = {
                timePerRound: $("#slider1").val(),
                numRounds: $("#slider2").val(),
                lobbySize: $("#slider3").val(),
                afkTimeout: $("#slider4").val()
            }
        });
        $('#button').click(function (e) {
            e.preventDefault();
            socket.emit('createLobby', rules);
        });

        let debug = 0;
        socket.on('joinAsCreator', (code) => {
            this.setState(state => ({
                lobbyCreated: true,
                loobbyCode: code
            }));
            // alert("The lobby code is: " + code + " " + debug);
            debug++;
        });
    }

    componentWillUnmount() {
        alert("The lobby code is: " + this.state.loobbyCode );
    }

    render() {

        let component = null;
        switch (this.state.lobbyCreated) {
            case false:
                component =
                    <div className="lobby">
                        <div className="center-back">
                            <Link to="/">
                                <Button className="back-button" variant="outline-primary">← Back</Button>
                            </Link>
                            <Logo/>
                            <div className="empty"/>
                        </div>
                        <title>Create a lobby</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet"/>
                        <h1>CREATE A LOBBY</h1>
                        <div id="split-container">
                            <div id="left">
                                <label htmlFor="timePerRound">TIME PER ROUND:</label>
                                <input defaultValue="20 SECONDS" type="text" id="timePerRound" readOnly/>
                                <input type="range" min={20} max={80} defaultValue={20} className="slider"
                                       id="slider1"/>
                                <br/><br/>
                                <label htmlFor="numRounds">NUMBER OF ROUNDS:  </label>
                                <input defaultValue="1 ROUND(S)" type="text" id="numRounds" readOnly/>
                                <input type="range" min={1} max={10} defaultValue={1} className="slider" id="slider2"/>
                            </div>
                            <div id="right">
                                <label htmlFor="lobbySize">LOBBY SIZE:  </label>
                                <input defaultValue="3 PLAYERS" type="text" id="lobbySize" readOnly/>
                                <input type="range" min={3} max={8} defaultValue={3} className="slider" id="slider3"/>
                                <br/><br/>
                                <label htmlFor="afkTimeout">AFK TIMEOUT:  </label>
                                <input defaultValue="1 MINUTE(S)" type="text" id="afkTimeout" readOnly/>
                                <input type="range" min={1} max={5} defaultValue={1} className="slider" id="slider4"/>
                            </div>
                        </div>
                        <br/>
                        <div id="button">
                            <ButtonSplash imagesource={require('../Assets/images/blueSplash.png')} text={"Create"}/>
                        </div>
                    </div>
                break;
            case true:
                component =
                    <Redirect to={{
                        pathname: '/joinLobby',
                        state: {isCreator: true}
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

export default CreateLobby;
