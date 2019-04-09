import React, { Component } from 'react';

import "./RoundTransitions.css";

import Logo from "../Game/Utilities/Logo";



class RoundTransitions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        this.id = setTimeout(() => this.props.handleTransition(), 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.id);
    }

    render() {
        return (

            <div className="background">
                <Logo/>
                <h1 className= "round-title">Round 1</h1>
                <h2>Answer two questions with your most clever response!</h2>
            </div>

        );

    }

}

export default RoundTransitions;
