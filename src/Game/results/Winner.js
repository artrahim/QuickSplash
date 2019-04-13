import React, {Component} from 'react'

function getGif(colour) {

    let playerGif;

    switch (colour) {
        case 'blueSplashPlayer':
            playerGif = 'smileanimateblue';
            break;
        case 'tealSplashPlayer':
            playerGif = 'smileanimateteal';
            break;
        case 'yellowSplashPlayer':
            playerGif = 'smileanimateyellow';
            break;
        case 'orangeSplashPlayer':
            playerGif = 'smileanimateorange';
            break;
        case 'redSplashPlayer':
            playerGif = 'smileanimatered';
            break;
        case 'greenSplashPlayer':
            playerGif = 'smileanimategreen';
            break;
        case 'purpleSplashPlayer':
            playerGif = 'smileanimatepurple';
            break;
        case 'pinkSplashPlayer':
            playerGif = 'smileanimatepink';
            break;
    }

    return playerGif

}

class Winner extends Component {
    render() {
        return (
            <div id="Winner">
                <img id="firstSplash" src={require("../../Assets/images/" + getGif(this.props.splash1.colour) + ".gif")}
                     alt="Winner ColorSplash"/>
                <img id="goldmedal" src={require('../../Assets/images/gold.png')} alt="goldmedal"/>
                <p id="firstusername">{this.props.splash1.nickname}</p>
            </div>
        );
    }
}

export default Winner;