import React, {Component} from "react";
import {NavLink, HashRouter, Link} from "react-router-dom";
import ButtonSplash from "../Game/Utilities/ButtonSplash";
import Button from 'react-bootstrap/Button';
import posed from 'react-pose';
import {authenticate} from '../Router';
import {tween, easing, styler, composite, physics} from 'popmotion';
import './Home.css';

// const Swipeable = posed.div({
//     draggable: "x"
// });

const createjs = window.createjs;
let props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,volume: 0.1})
let props1 = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,volume: 0.5})

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

        const polarToCartesian = ({angle, radius}) => ({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)
        });

        composite({
            angle: physics({velocity: 5}),
            radius: tween({
                from: 1500,
                ease: easing.easeInOut,
                duration: 2000
            })
        }).pipe(polarToCartesian)
            .start(logoStyler.set);
    }

    playTick() {
        createjs.Sound.play("tick",props1);
      }

    playSplash() {
        createjs.Sound.play("splash", props);
    }

    render() {

        let component = null;

        if (authenticate.isAuthenticated) {
            component = <Link to="/profile">
                <Button className="back-button" variant="outline-primary" onClick={this.playTick}
                        >Profile Page</Button>
            </Link>
        }


        return (
            <div id="home">
                <HashRouter>
                    <div id="navbarContainer">
                        <img className="home-player" id="hp2" src={require('../Assets/images/shockedanimateorange.gif')} alt="splash"/>
                        <img className="home-player" id = "hp1" src={require('../Assets/images/smileanimatepink.gif')} alt="splash"/>
                        <div className="profilehelper">{component}</div>
                        <div id="navbarImage">
                            <img className="starImage" src={require('../Assets/images/homePage.png')}
                                 alt="button">
                            </img>
                            <img className="logo" src={require('../Assets/images/logo.png')} alt="button"/>
                            <div className="textImage">Speak Your Mind!</div>
                        </div>
                        <div id="navbarButton">
                            <div className="container-flex">
                                <NavLink className="loginButton"
                                         to={authenticate.isAuthenticated ? "/logout" : '/login'}
                                         onClick={this.playTick}>
                                    <ButtonSplash imagesource={require('../Assets/images/blueSplash.png')}
                                                  text={authenticate.isAuthenticated ? "Logout" : "Login"}/>
                                </NavLink>
                                <NavLink className="createLobbyButton" to="/createLobby" onClick={this.playTick}>
                                    <ButtonSplash imagesource={require('../Assets/images/blueSplash.png')}
                                                  text={"Create a Lobby"}/>
                                </NavLink>
                                <NavLink className="joinLobbyButton" to="/joinLobby" onClick={this.playTick}>
                                    <ButtonSplash imagesource={require('../Assets/images/blueSplash.png')}
                                                  text={"Join a Lobby"}/>
                                </NavLink>
                                <NavLink className="howToPlayButton" to="/howToPlay" onClick={this.playTick}>
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
