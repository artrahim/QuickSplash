import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class Waiting extends Component {

    render() {
        let button = null;
        let text = null;
        const isCreator = this.props.isCreator;
        const isStarted = this.props.isStarted;
        if (!isStarted){
            button = <img id="button" src={ require('../Assets/images/blueSplash.png') } alt="button" />
            text = "THE GAME TO START"
        }
        else {
            text = "EVERYONE TO ANSWER"
        }

        return (
            <div>
                <title>Create a lobby</title>
                <br></br>
                <h1>WAITING FOR {text}...</h1>
                {button}
            </div>
        );
    }

}

export default Waiting;
