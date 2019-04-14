import React, {Component} from 'react'
import silver from '../../Assets/images/silver.png';
import bronze from '../../Assets/images/bronze.png';
import PlayerAnimation from "../../Setup/PlayerAnimation";


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
                        <PlayerAnimation id="otherPlayer"
                                         src={require("../../Assets/images/" + getGif(this.props.splash2.colour) + ".gif")}
                                         alt="colorSplash"/>
                        <img id="othermedals" src={silver} alt="medal"/>
                        <div id="temp" className={'playerInfo'}><p id="username">{this.props.splash2.nickname}</p>
                            <div className='playerScore'><p>{this.props.splash2.score}</p></div>
                        </div>
                    </div>
                    <div className="column">
                        <PlayerAnimation id="otherPlayer"
                                         src={require("../../Assets/images/" + getGif(this.props.splash3.colour) + ".gif")}
                                         alt="colorSplash"/>
                        <img id="othermedals" src={bronze} alt="medal"/>
                        <div id="temp" className={'playerInfo'}><p id="username">{this.props.splash3.nickname}</p>
                            <div className='playerScore'><p>{this.props.splash3.score}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Others;