import React, {Component} from "react";
import {
    Route,
    HashRouter,
    Redirect,
} from "react-router-dom";

import {AnimatedRoute} from 'react-router-transition';


import socketIOClient from "socket.io-client";
import io from 'socket.io-client';
import Cookies from 'universal-cookie';

import Home from "./Setup/Home";
import CreateLobby from "./Setup/CreateLobby";
import JoinLobby from "./Setup/JoinLobby";
import Game from "./Game/Game";
import Login from "./Setup/Login";
import Logout from "./Setup/Logout";
import Instructions from "./Setup/Instructions";

import '../src/Setup/Home.css'
import ProfileMain from "./Setup/Profile/ProfileMain";

var socket;
const cookies = new Cookies();

// const path = require('path');
// const express = require('express');
// const app = express();
// const http = require('http').Server(app);
//const io = require('socket.io')(http);


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
        // socket = io.connect('http://quicksplash.herokuapp.com/');
        //http.listen(process.env.PORT || 5000);
        //socket = io.connect('http://quicksplash.herokuapp.com/');
    }

    componentWillMount() {

        // get the cookie and check for auth
        let cookieInfo = cookies.get('username');
        if (cookieInfo != null) {
            console.log(cookieInfo);
            if (cookieInfo.auth) {
                authenticate.authenticate();
            }
        } else {
            console.log(cookieInfo);
        }

    }

    render() {


        return (
            <div>
                <div className="">
                    <HashRouter>

                        <Route exact path="/" component={Home}/>

                        {/*<AnimatedRoute*/}
                        {/*    className='route-transition'*/}
                        {/*    path="/login"*/}
                        {/*    runOnMount={false}*/}
                        {/*    component={Login}*/}
                        {/*    atEnter={{opacity: 0}}*/}
                        {/*    atLeave={{opacity: 0}}*/}
                        {/*    atActive={{opacity: 1}}*/}
                        {/*    mapStyles={(styles) => ({*/}
                        {/*        opacity: styles.opacity,*/}
                        {/*    })}*/}
                        {/*/>*/}


                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>


                        <AnimatedRoute
                            className='r'
                            path="/howToPlay"
                            component={Instructions}
                            atEnter={{offset: -100}}
                            atLeave={{offset: -100}}
                            atActive={{offset: 0}}
                            mapStyles={(styles) => ({
                                transform: `translateX(${styles.offset}%)`,
                            })}
                        />
                        {/*<Route path="/howToPlay" component={Instructions}/>*/}

                        <PrivateRoute path="/joinLobby" component={JoinLobby}/>
                        <PrivateRoute path="/game" component={Game}/>
                        <PrivateRoute path="/createLobby" component={CreateLobby}/>
                        <PrivateRoute path="/profile" component={ProfileMain}/>


                    </HashRouter>
                </div>
            </div>
        );
    }
}


export {Router, socket, authenticate};
