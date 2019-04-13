import React, {Component} from "react";
import {
    Route,
    HashRouter,
    Redirect,
} from "react-router-dom";

import socketIOClient from "socket.io-client";
import Cookies from 'universal-cookie';


import Home from "./Setup/Home";
import CreateLobby from "./Setup/CreateLobby";
import JoinLobby from "./Setup/JoinLobby";
import Game from "./Game/Game";
import Login from "./Setup/Login";

var socket;
const cookies = new Cookies();


function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={props =>
                authenticate.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    );
}

const authenticate = {
    isAuthenticated: false,
    authenticate(callback) {
        this.isAuthenticated = true;
        setTimeout(callback, 100);
    },
    logout(callback) {
        this.isAuthenticated = false;
        setTimeout(callback, 100);
    }
};


class Router extends Component {

    constructor() {
        super();
        this.state = {endpoint: "http://localhost:5000/"};
        socket = socketIOClient(this.state.endpoint);
    }

    componentWillMount() {

        // get the cookie and check for auth
        let cookieInfo = cookies.get('username');
        if (cookieInfo != null ) {
            console.log(cookieInfo);
            if (cookieInfo.auth)
            {
                authenticate.authenticate();
            }
        }else {
            console.log(cookieInfo);
        }

    }

    render() {
        return (
            <div>
                <div className="content">
                    <HashRouter>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>

                        <PrivateRoute path="/joinLobby" component={JoinLobby}/>
                        <PrivateRoute path="/game" component={Game}/>
                        <PrivateRoute path="/createLobby" component={CreateLobby}/>

                    </HashRouter>
                </div>
            </div>
        );
    }
}

export {Router, socket, authenticate};
