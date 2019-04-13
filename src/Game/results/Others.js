import React, {Component} from 'react'
import silver from '../../Assets/images/silver.png';
import bronze from '../../Assets/images/bronze.png';


function getGif(colour) {

    let playerGif;

    switch (colour) {
        case 'blueSplashPlayer':
            playerGif = 'shockedanimateblue';
            break;
        case 'tealSplashPlayer':
            playerGif = 'shockedanimateteal';
            break;
        case 'yellowSplashPlayer':
            playerGif = 'shockedanimateyellow';
            break;
        case 'orangeSplashPlayer':
            playerGif = 'shockedanimateorange';
            break;
        case 'redSplashPlayer':
            playerGif = 'shockedanimatered';
            break;
        case 'greenSplashPlayer':
            playerGif = 'shockedanimategreen';
            break;
        case 'purpleSplashPlayer':
            playerGif = 'shockedanimatepurple';
            break;
        case 'pinkSplashPlayer':
            playerGif = 'shockedanimatepink';
            break;
    }

    return playerGif

}

class Others extends Component {
    render() {
        return (
            <div id="Others">
                <div className="row">
                    <div className="column">
                        <img id="otherPlayer"
                             src={require("../../Assets/images/" + getGif(this.props.splash2.colour) + ".gif")}
                             alt="colorSplash"/>
                        <img id="othermedals" src={silver} alt="medal"/>
                        <p id="otherusername">{this.props.splash2.nickname}</p>
                    </div>
                    <div className="column">
                        <img id="otherPlayer"
                             src={require("../../Assets/images/" + getGif(this.props.splash3.colour) + ".gif")}
                             alt="colorSplash"/>
                        <img id="othermedals" src={bronze} alt="medal"/>
                        <p id="otherusername">{this.props.splash3.nickname}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Others;