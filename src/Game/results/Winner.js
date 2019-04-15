import React, {Component} from 'react'
import PlayerAnimation from "../../Assets/Animations/PlayerAnimation";
import TransitionWinner from "../../Assets/Animations/TransitionWinner";

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


    state = {hidden: 'hidden'};

    getInitialState() {
        return ({hidden1: "hidden"});
    }

    componentWillMount() {
        var that = this;
        setTimeout(function () {
            that.show();
        }, 6000);
    }

    show() {
        this.setState({hidden: ""});
    }


    render() {
        return (
            <div id="Winner">
                {/*<div className="winnerFace">*/}
                <TransitionWinner className={this.state.hidden}>
                    <PlayerAnimation id="firstSplash"
                                     src={require("../../Assets/images/" + getGif(this.props.splash1.colour) + ".gif")}
                                     alt="Winner ColorSplash"/>
                    {/*</div>*/}
                    <img id="goldmedal" src={require('../../Assets/images/gold.png')} alt="goldmedal"/>
                    <div className='playerInfo'>
                        <p id="username">{this.props.splash1.nickname}</p>
                        <div className='playerScore'><p>{this.props.splash1.score}</p></div>
                    </div>
                </TransitionWinner>
            </div>
        );
    }
}

export default Winner;