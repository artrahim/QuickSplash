import React, {Component} from "react";
import {Route, HashRouter} from "react-router-dom";
import socketIOClient from "socket.io-client";

import Logo from "./Game/Utilities/Logo";
import Home from "./Setup/Home";
import CreateLobby from "./Setup/CreateLobby";
import JoinLobby from "./Setup/JoinLobby";
import Game from "./Game/Game";
import RoundTransitions from "./Game/RoundTransitions";
import resultmain from "./Game/results/resultmain";
import SignUpForm from "./Setup/SignUpForm";
import Login from "./Setup/Login";

var socket;

class Router extends Component {

    constructor() {
        super();
        this.state = {endpoint: "http://localhost:5000/"};
        socket = socketIOClient(this.state.endpoint);
    }

    render() {
        return (
            <div>
                <div className="content">
                    <HashRouter>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/createLobby" component={CreateLobby}/>
                        <Route path="/joinLobby" component={JoinLobby}/>
                        <Route path="/game" component={Game}/>
                    </HashRouter>
                </div>
            </div>
        );
    }

}

export { Router, socket };
