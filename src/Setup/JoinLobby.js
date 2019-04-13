import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {socket} from '../Router';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';

import Logo from '../Game/Utilities/Logo'
import './Lobby.css';
import ButtonSplash from "../Game/Utilities/ButtonSplash";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

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

    }

    componentDidMount() {
        let tname = '';
        $('#button').click(function () {
            let uname = cookies.get('username').username;
            socket.emit('joinLobby', $("#joinCode").val(), $("#nickname").val(), uname);
            // set the cookies with nickname
            let temp ={
                username: uname,
                auth: true,
                nickname: $("#nickname").val()
            };
            temp = JSON.stringify(temp);
            let expTime = 15 * 60;
            console.log("Cookies info in login form:", temp);
            cookies.set('username', temp, { path: '/' , maxAge:expTime});
            localStorage.setItem("lobbyCode", $("#joinCode").val());
        });

        socket.on('failedToJoin', function (errorMessage) {
            alert(errorMessage);
        });

        socket.on('waiting', (aColour) => {
            this.setState(state => ({
                started: true,
            }));
            localStorage.setItem("colour", aColour);
        });

    }

    render() {

        let component = null;
        let lobbyCode;
        if (this.props.location.state === null){
            lobbyCode = "";
        }
        else {
            lobbyCode = this.props.location.state.lobbyCode;
        }
        switch (this.state.started) {
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
                        <title>Join a lobby</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet"/>
                        <h1>JOIN A LOBBY</h1>
                        <br/>
                        <div id="container">
                            <label htmlFor="joinCode">ENTER A JOIN CODE: </label>
                            <br/>
                            <input defaultValue={lobbyCode} type="text" className="textBox" id="joinCode"/>
                            <br/><br/>
                            <label htmlFor="nickname">WHAT SHOULD WE CALL YOU?: </label>
                            <input defaultValue="" type="text" className="textBox" id="nickname"/>
                        </div>
                        <br/>
                        <div id="button">
                            <ButtonSplash imagesource={require('../Assets/images/blueSplash.png')} text={"Join"}/>
                        </div>
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
