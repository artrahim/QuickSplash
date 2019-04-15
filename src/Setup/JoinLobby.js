import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {socket} from '../Router';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';

import Logo from '../Game/Utilities/Logo'
import './Lobby.css';
import ButtonSplash from "../Game/Utilities/ButtonSplash";

import Cookies from 'universal-cookie';
import TransitionLeft from "../Assets/Animations/TransitionLeft";
import TransitionRight from "../Assets/Animations/TransitionRight";
import ButtonScale from "../Assets/Animations/ButtonScale";


const cookies = new Cookies();

const createjs = window.createjs;
let props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, volume: 0.1})
let props1 = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, volume: 0.5})


class JoinLobby extends Component {

    constructor(props) {

        super();
        this.state = {
            username: cookies.get('username'),
            nickname: "",
            started: false,
            lobbyCode: 0,
            colour: "",
        };
        this.playTick = this.playTick.bind(this);
        this.playSplash = this.playSplash.bind(this);
    }

    componentDidMount() {
        let tname = '';
        $('#button').click(function () {
            if ($("#nickname").val().length > 0) {
                let uname = cookies.get('username').username;
                socket.emit('joinLobby', $("#joinCode").val(), $("#nickname").val(), uname);
                // set the cookies with nickname
                let temp = {
                    username: uname,
                    auth: true,
                    nickname: $("#nickname").val()
                };
                temp = JSON.stringify(temp);
                let expTime = 60 * 60;
                console.log("Cookies info in login form:", temp);
                cookies.set('username', temp, {path: '/', maxAge: expTime});
                localStorage.setItem("lobbyCode", $("#joinCode").val());
            }
            else{
                alert("Your nickname must be at least 1 character long");
            }
        });

        socket.on('failedToJoin', function (errorMessage) {
            alert(errorMessage);
        });

        socket.on('waiting', (aColour) => {
            this.setState(state => ({
                started: true,
            }));
            createjs.Sound.play("splash", props);
            localStorage.setItem("colour", aColour);
        });

    }

    playTick() {
        createjs.Sound.play("tick", props1);
    }

    playSplash() {
        createjs.Sound.play("splash", props);
    }

    render() {

        let component = null;
        let lobbyCode;
        if (this.props.location.state === undefined) {
            lobbyCode = "";
        } else {
            lobbyCode = this.props.location.state.lobbyCode;
        }
        switch (this.state.started) {
            case false:
                component =
                    <div className="lobby">
                        <div className="center-back">
                            <Link id="backlink" to="/">
                                <Button className="back-button" variant="outline-primary" onClick={this.playSplash}
                                        >← Back</Button>
                            </Link>
                            <div id="logoLink"><Logo/></div>
                            <div className="empty"></div>
                        </div>
                        <title>Join a lobby</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet"/>
                        <h1>JOIN A LOBBY</h1>
                        <br/>
                        <div id="container">
                            <TransitionLeft>
                                <label className="option" htmlFor="joinCode">ENTER A JOIN CODE: </label>
                                <br/>
                                <input defaultValue={lobbyCode} type="text" className="textBox" id="joinCode"
                                       onClick={this.playTick}/>
                            </TransitionLeft>
                            <br/><br/>
                            <TransitionRight>
                                <label className="option" htmlFor="nickname">WHAT SHOULD WE CALL YOU?: </label>
                                <input maxLength={13} defaultValue="" type="text" className="textBox" id="nickname"
                                       onClick={this.playTick}/>
                            </TransitionRight>
                        </div>
                        <br/>
                        <ButtonScale id="button">
                            <ButtonSplash imagesource={require('../Assets/images/blueSplash.png')} text={"Join"}/>
                        </ButtonScale>
                    </div>
                break;
            case true:
                component =
                    <Redirect to={{
                        pathname: '/game',
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

export default JoinLobby;
