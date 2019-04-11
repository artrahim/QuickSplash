import React, {Component} from 'react';
import {Link, NavLink, Redirect} from 'react-router-dom';
import {socket} from '../Router';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';

import Logo from '../Game/Utilities/Logo'
import './Lobby.css';
import ButtonSplash from "../Game/Utilities/ButtonSplash";

class JoinLobby extends Component {

    constructor(props) {

        super();
        this.state = {
            started: false,
            lobbyCode: 0
        }

    }

    componentDidMount() {
        $('#button').click(function () {
            socket.emit('joinLobby', $("#joinCode").val(), $("#nickname").val());
        });

        socket.on('failedToJoin', function (errorMessage) {
            alert(errorMessage);
        });

        socket.on('waiting', (joinCode) => {
            this.setState(state => ({
                started: true,
                lobbyCode: joinCode
            }));
        });

    }

    render() {

        let component = null;
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
                            <input defaultValue="" type="text" className="textBox" id="joinCode"/>
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
                        state: {
                            isCreator: this.props.location.state ? this.props.location.state.isCreator : false,
                            lobbyCode: this.state.lobbyCode
                        }
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
