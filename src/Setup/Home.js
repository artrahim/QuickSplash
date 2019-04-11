import React, {Component} from "react";
import {NavLink, HashRouter} from "react-router-dom";
import ButtonSplash from "../Game/Utilities/ButtonSplash";

import posed from 'react-pose';

import Test from './Test'

import './Home.css';

const Swipeable = posed.div({
    draggable: "x"
});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            auth: false
        };
    }
    
    render() {

        return (
            <div id="home">
                <HashRouter>
                    <div id="navbarContainer">
                        <div id="navbarImage">
                            <img className="starImage" src={require('../Assets/images/homePage.png')} alt="button">
                            </img>
                            <Test className="logo" src={require('../Assets/images/logo.png')} alt="button"/>
                            <div className="textImage">Speak Your Mind!</div>
                        </div>
                        <div id="navbarButton">
                            <div className="container-flex">
                                <NavLink className="loginButton" to="/login">
                                    <ButtonSplash imagesource={require('../Assets/images/blueSplash.png')}
                                                  text={"Login"}/>
                                </NavLink>
                                <NavLink className="createLobbyButton" to="/createLobby">
                                    <ButtonSplash imagesource={require('../Assets/images/blueSplash.png')}
                                                  text={"Create a Lobby"}/>
                                </NavLink>
                                <NavLink className="joinLobbyButton" to="/joinLobby">
                                    <ButtonSplash imagesource={require('../Assets/images/blueSplash.png')}
                                                  text={"Join a Lobby"}/>
                                </NavLink>
                                <NavLink className="howToPlayButton" to="/howToPlay">
                                    <ButtonSplash imagesource={require('../Assets/images/blueSplash.png')}
                                                  text={"How To Play"}/>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </HashRouter>
            </div>

        )

    }

}

export default Home;
