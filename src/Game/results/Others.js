import React, {Component} from 'react'
import silver from '../../Assets/images/silver.png';
import bronze from '../../Assets/images/bronze.png';
import PlayerAnimation from "../../Assets/Animations/PlayerAnimation";
import TransitionRightLoser from "../../Assets/Animations/TransitionRightLoser";
import TransitionLeftLoser from "../../Assets/Animations/TransitionLeftLoser";


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

    state = {hidden1: 'hidden', hidden2: 'hidden'};

    getInitialState() {
        return ({hidden1: "hidden", hidden2: 'hidden'});
    }

    componentWillMount() {
        var that = this;
        setTimeout(function () {
            that.show();
        }, 4000);

        setTimeout(function () {
            that.showOtherLoser();
        }, 3000);

        console.log("init state = " + this.state.hidden)
    }

    show() {
        this.setState({hidden1: ""});
    }

    showOtherLoser() {
        this.setState({hidden2: ""});
    }


    render() {
        return (
            <div id="Others">
                <div className="row">
                    <div className="column">
                        <TransitionRightLoser className={this.state.hidden1}>
                            <PlayerAnimation id="otherPlayer"
                                             src={require("../../Assets/images/" + getGif(this.props.splash2.colour) + ".gif")}
                                             alt="colorSplash"/>
                            <img id="othermedals" src={silver} alt="medal"/>
                            <div id="temp" className={'playerInfo'}><p id="username">{this.props.splash2.nickname}</p>
                                <div className='playerScore'><p>{this.props.splash2.score}</p></div>
                            </div>
                        </TransitionRightLoser>
                    </div>
                    <div className="column">
                        <TransitionLeftLoser className={this.state.hidden2}>
                            <PlayerAnimation id="otherPlayer"
                                             src={require("../../Assets/images/" + getGif(this.props.splash3.colour) + ".gif")}
                                             alt="colorSplash"/>
                            <img id="othermedals" src={bronze} alt="medal"/>
                            <div id="temp" className={'playerInfo'}><p id="username">{this.props.splash3.nickname}</p>
                                <div className='playerScore'><p>{this.props.splash3.score}</p></div>
                            </div>
                        </TransitionLeftLoser>
                    </div>
                </div>
            </div>
        );
    }
}

export default Others;