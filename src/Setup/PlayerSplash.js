import React, {Component} from 'react'


import './Home.css';
import PlayerAnimation from "./PlayerAnimation";

/*
Makes the player splash.
Random image source.
x and y properties are set in state.
 */

class PlayerSplash extends Component {

    constructor(props) {

        super(props);

        this.state = {
            position: 'absolute',
            top: props.y,
            left: props.x
        };

    }

    render() {
        return (
            <div style={this.state}>
                <PlayerAnimation className="player" src={this.props.imagesource} alt="player">
                </PlayerAnimation>
                <div className="playerName"> {this.props.text} </div>
            </div>
        )
    }
}

export default PlayerSplash