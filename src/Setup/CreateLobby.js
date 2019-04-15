import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {socket} from '../Router';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';


import Logo from '../Game/Utilities/Logo';
import './Lobby.css';
import ButtonSplash from "../Game/Utilities/ButtonSplash";
import TransitionUp from "../Assets/Animations/TransitionUp";

const createjs = window.createjs;
let props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,volume: 0.1})
let props1 = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,volume: 0.5})


class CreateLobby extends Component {

    constructor() {

        super();
        this.state = {
            lobbyCreated: false,
            lobbyCode : null
        }
        this.playTick = this.playTick.bind(this);
        this.playSplash = this.playSplash.bind(this);
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
            $("#afkTimeout").val($("#slider4").val() + " QUESTIONS(S)");
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

        socket.on('joinAsCreator', (code) => {
            this.setState(state => ({
                lobbyCreated: true,
                lobbyCode: code
            }));
            localStorage.setItem('lobbyCreated', true);
            let a = [];
            if (localStorage.getItem('codes') === null){
                a = [];
            }
            else{
                a = JSON.parse(localStorage.getItem('codes'));
            }
            a.push(code);
            localStorage.setItem('codes', JSON.stringify(a))
        });
    }

    /*
    componentWillUnmount() {
        alert("The lobby code is: " + this.state.lobbyCode );
    }
     */

    playTick() {
        createjs.Sound.play("tick",props1);
    }

    playSplash() {
        createjs.Sound.play("splash",props);
    }

    render() {

        let component = null;
        switch (this.state.lobbyCreated) {
            case false:
                component =
                    <TransitionUp className="lobby">
                        <div className="center-back">
                            <Link id="backlink" to="/">
                                <Button className="back-button" variant="outline-primary" onClick={this.playSplash}>← Back</Button>
                            </Link>
                            <div id="logoLink"><Logo/></div>
                            <div className="empty"> </div>


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
                                       id="slider1"  onChange={this.playTick} />
                                <br/><br/>
                                <label htmlFor="numRounds">NUMBER OF ROUNDS:</label>
                                <input defaultValue="1 ROUND(S)" type="text" id="numRounds" readOnly/>
                                <input type="range" min={1} max={5} defaultValue={1} className="slider" id="slider2"  onChange={this.playTick} />
                            </div>
                            <div id="right">
                                <label htmlFor="lobbySize">LOBBY SIZE:</label>
                                <input defaultValue="3 PLAYERS" type="text" id="lobbySize" readOnly/>
                                <input type="range" min={3} max={8} defaultValue={3} className="slider" id="slider3"  onChange={this.playTick}/>
                                <br/><br/>
                                <label htmlFor="afkTimeout">INACTIVITY TIMER:</label>
                                <input defaultValue="1 QUESTION(S)" type="text" id="afkTimeout" readOnly/>
                                <input type="range" min={1} max={5} defaultValue={1} className="slider" id="slider4"  onChange={this.playTick}/>
                            </div>
                        </div>
                        <br/>
                        <div id="button"  onClick={this.playSplash}>
                            <ButtonSplash imagesource={require('../Assets/images/blueSplash.png')} text={"Create"}/>
                        </div>
                    </TransitionUp>
                break;
            case true:
                component =
                    <Redirect to={{
                        pathname: '/joinLobby',
                        state: { lobbyCode: this.state.lobbyCode}
                    }}/>;
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
