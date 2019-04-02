import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import $ from 'jquery';

import Logo from '../Game/Utilities/Logo'
import './Lobby.css';

class CreateLobby extends Component {

    componentDidMount(){
        $(function(){
            $(".slider").on("input", function() {
                $("#timePerRound").val($("#slider1").val() + " SECONDS");
                $("#numRounds").val($("#slider2").val() + " ROUND(S)");
                $("#lobbySize").val($("#slider3").val() + " PLAYERS");
                $("#afkTimeout").val($("#slider4").val() + " MINUTE(S)");
            });
        });
    }

    render() {
        return (
            <div>
                <title>Create a lobby</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet" />
                <h1>CREATE A LOBBY</h1>
                <div id="container">
                    <label htmlFor="timePerRound">TIME PER ROUND: </label>
                    <input defaultValue="20 SECONDS" type="text" id="timePerRound" readOnly />
                    <input type="range" min={20} max={80} defaultValue={20} className="slider" id="slider1" />
                    <br /><br />
                    <label htmlFor="numRounds">NUMBER OF ROUNDS: </label>
                    <input defaultValue="1 ROUND(S)" type="text" id="numRounds" readOnly />
                    <input type="range" min={1} max={10} defaultValue={1} className="slider" id="slider2" />
                    <br /><br />
                    <label htmlFor="lobbySize">LOBBY SIZE: </label>
                    <input defaultValue="3 PLAYERS" type="text" id="lobbySize" readOnly />
                    <input type="range" min={3} max={8} defaultValue={3} className="slider" id="slider3" />
                    <br /><br />
                    <label htmlFor="afkTimeout">AFK TIMEOUT: </label>
                    <input defaultValue="1 MINUTE(S)" type="text" id="afkTimeout" readOnly />
                    <input type="range" min={1} max={5} defaultValue={1} className="slider" id="slider4" />
                </div>
                <br/>
                <NavLink to="/Game"><img id="button" src={ require('../Assets/images/blueSplash.png') } alt="button" /></NavLink>
            </div>
        );
    }

}

export default CreateLobby;
