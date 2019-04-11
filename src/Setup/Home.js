import React, {Component} from "react";
import {NavLink, HashRouter} from "react-router-dom";
import ButtonSplash from "../Game/Utilities/ButtonSplash";

import './Home.css';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            auth: false
        };

        this.animate = this.animate.bind(this);
    }

<<<<<<< HEAD
    animate(){

        console.log("where am i");

        let c = window.createjs;

        console.log(" this is create js: " + c);

        c.CSSPlugin.install(c.Tween);


        const w = window.innerWidth, h = window.innerHeight;
        // const logo = document.getElementById("btnLogin");
        // const logo = document.getElementsByClassName("textImage");

        // logo.style.left = w*0.1+"px";
        // logo.style.top = h*0.1+"px";

        // console.log("logo" + logo)

        c.Tween.get("btnLogo", {loop: true})
            .to({x: w}, 3000, c.Ease.getPowInOut(4))
            .to({alpha: 0, y: 175}, 500, c.Ease.getPowInOut(2))
            .to({alpha: 0, y: 225}, 100)
            .to({alpha: 1, y: 200}, 500, c.Ease.getPowInOut(2))
            .to({x: 0}, 800, c.Ease.getPowInOut(2))
            .to({rotate: 180}, 2000)
            .call(() => {
                console.log("done");
            });

        c.Ticker.timingMode = c.Ticker.RAF;
    }

    // componentDidMount() {

        // console.log("where am i ")
        //
        // let c = window.createjs;
        //
        // console.log(" this is create js: " + c);
        //
        // c.CSSPlugin.install(c.Tween);
        //
        //
=======
    componentDidMount() {
        // let c = window.createjs;
        //
>>>>>>> 7b109d8a795b87b1ccd0939e7e1971afce2f7e0d
        // const w = window.innerWidth, h = window.innerHeight;
        // const logo = document.getElementById("navbarImage");
        // // const logo = document.getElementsByClassName("textImage");
        //
        // // logo.style.left = w*0.1+"px";
        // // logo.style.top = h*0.1+"px";
        //
<<<<<<< HEAD
        // console.log("logo" + logo)
        //
        // c.Tween.get(logo, { loop: true })
        //     .to({ x: w }, 3000, c.Ease.getPowInOut(4))
        //     .to({ alpha: 0, y: 175 }, 500, c.Ease.getPowInOut(2))
        //     .to({ alpha: 0, y: 225 }, 100)
        //     .to({ alpha: 1, y: 200 }, 500, c.Ease.getPowInOut(2))
        //     .to({ x: 0 }, 800, c.Ease.getPowInOut(2))
        //     .to({rotate : 180},2000)
=======
        // c.Tween.get(logo, {loop: true})
        //     .to({x: w}, 3000, c.Ease.getPowInOut(4))
        //     .to({alpha: 0, y: 175}, 500, c.Ease.getPowInOut(2))
        //     .to({alpha: 0, y: 225}, 100)
        //     .to({alpha: 1, y: 200}, 500, c.Ease.getPowInOut(2))
        //     .to({x: 0}, 800, c.Ease.getPowInOut(2))
        //     .to({rotate: 180}, 2000)
>>>>>>> 7b109d8a795b87b1ccd0939e7e1971afce2f7e0d
        //     .call(() => {
        //         console.log("done");
        //     });
        //
<<<<<<< HEAD
        // c.Ticker.timingMode = c.Ticker.RAF;
=======
        // // c.Ticker.timingMode = c.Ticker.RAF;
>>>>>>> 7b109d8a795b87b1ccd0939e7e1971afce2f7e0d

    // }

    render() {

        // this.animate();

        return (
<<<<<<< HEAD
            <HashRouter>
                <div id="navbarContainer">
                    <div id="navbarImage">
                        <img className="starImage" src={ require('../Assets/images/homePage.png') } alt="button" >
                        </img>
                        <img onClick={() => this.animate()} style={{"pointerEvents": "all"}} className="logo" src={require('../Assets/images/logo.png')} />
                        <div className="textImage">Speak Your Mind!</div>
                    </div>
                    <div id="navbarButton">
=======
            <div id="home">
                <HashRouter>
                    <div id="navbarContainer">
                        <div id="navbarImage">
                            <img className="starImage" src={require('../Assets/images/homePage.png')} alt="button">
                            </img>
                            <img className="logo" src={require('../Assets/images/logo.png')}></img>
                            <div className="textImage">Speak Your Mind!</div>
                        </div>
                        <div id="navbarButton">
>>>>>>> 7b109d8a795b87b1ccd0939e7e1971afce2f7e0d
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
