import React, { Component } from 'react';

import "./Game.css";

import Logo from "../Game/Utilities/Logo";



class RoundTransitions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Logo/>
                <h1 className= "round-title">Round 1</h1>
                <h2>Answer two questions with your most clever response!</h2>
            </div>

        );

    }

}

export default RoundTransitions;
