import React, {Component} from "react";
import {NavLink, HashRouter} from "react-router-dom";
import ButtonSplash from "../Game/Utilities/ButtonSplash";

import posed from 'react-pose';

// import Test from './Test'

import {tween, easing, styler, physics, keyframes} from 'popmotion';


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

    componentDidMount() {

        const logo = document.querySelector('#navbarImage');
        const logoStyler = styler(logo);

        // keyframes({
        //     values: [
        //         {x: 0, y: 0, rotateY: 0, background: '#9B65DE'},
        //         {x: 300, y: 0, rotateY: 180, rotateX: 0, background: '#14D790'},
        //         {x: 300, y: 200, rotateY: 180, rotateX: 180, background: '#FF1C68'},
        //         {x: 0, y: 200, rotateY: 0, rotateX: 180, background: '#198FE3'},
        //         {x: 0, y: 0, rotateY: 0, rotateX: 0, background: '#9B65DE'}
        //     ],
        //     duration: 3000,
        //     easings: [easing.easeInOut, easing.easeInOut, easing.easeInOut, easing.easeInOut],
        //     loop: Infinity,
        //     //times: [0, 0.2, 0.5, 0.6, 1]
        // }).start(logoStyler.set);

        //
        // tween({
        //     to: {x: 300, rotate: 180},
        //     duration: 1000,
        //     ease: easing.linear,
        //     flip: Infinity,
        //     // elapsed: 500,
        //     // loop: 5,
        //     // yoyo: 5
        // }).start(logoStyler.set("x"));

        // tween({
        //     from: 100,
        //     to: 300,
        //     duration: 300,
        //     ease: easing.linear
        // }).start(logoStyler.set('x'));
    }

    render() {

        return (
            <div id="home">
                <HashRouter>
                    <div id="navbarContainer">
                        <div id="navbarImage">
                            <img className="starImage" src={require('../Assets/images/homePage.png')} alt="button">
                            </img>
                            <img className="logo" src={require('../Assets/images/logo.png')} alt="button"/>
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
