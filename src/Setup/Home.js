import React, {Component} from "react";
import {NavLink, HashRouter} from "react-router-dom";
import ButtonSplash from "../Game/Utilities/ButtonSplash";

import posed from 'react-pose';

// import Test from './Test'

import {tween, easing, styler, composite, physics} from 'popmotion';


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

        this.playSplash = this.playSplash.bind(this);
    }

    componentDidMount() {

        const logo = document.querySelector('#navbarImage');
        const logoStyler = styler(logo);

        const polarToCartesian = ({ angle, radius }) => ({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)
        });

        composite({
            angle: physics({ velocity: 5 }),
            radius: tween({
                from: 1200,
                to: 0,
                yoyo: 0,
                ease: easing.easeInOut,
                duration: 2000
            })
        }).pipe(polarToCartesian)
            .start(logoStyler.set);
    }

    playSplash() {
        window.createjs.Sound.play("splash");
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
                                <NavLink className="loginButton" to="/login" onClick={this.playSplash}>
                                    <ButtonSplash imagesource={require('../Assets/images/blueSplash.png')}
                                                  text={"Login"}/>
                                </NavLink>
                                <NavLink className="createLobbyButton" to="/createLobby"  onClick={this.playSplash}>
                                    <ButtonSplash imagesource={require('../Assets/images/blueSplash.png')}
                                                  text={"Create a Lobby"}/>
                                </NavLink>
                                <NavLink className="joinLobbyButton" to="/joinLobby" onClick={this.playSplash}>
                                    <ButtonSplash imagesource={require('../Assets/images/blueSplash.png')}
                                                  text={"Join a Lobby"}/>
                                </NavLink>
                                <NavLink className="howToPlayButton" to="/howToPlay" onClick={this.playSplash}>
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
