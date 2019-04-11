import React, { Component } from 'react';
import {socket} from '../Router';
import $ from 'jquery';

import Logo from "../Game/Utilities/Logo";

import Timer from './Utilities/Timer';
import Question from './Question';
import AnswerBox from './AnswerBox';
import Answer from './Answer';

import './Voting.css';

// import Results from './Results';

class Voting extends Component {

    constructor()
    {
        super();
        this.voteHandler = this.voteHandler.bind(this);
    }

    voteHandler(id)
    {
        console.log(id);
        socket.emit('vote', this.props.lobbyCode, id);
    }

    render() {

        return (
            <div>
                <Logo/>
                <Timer time={30}/>
                <Question question={"What is the worst place to be naked?"}/>
                <br/>
                <br/>
                <div id='AnswerBox'>
                    <Answer id={1} text={"sample1"} voteHandler={this.voteHandler}/>
                    <Answer id={2} text={"sample2"} voteHandler={this.voteHandler}/>
                </div>
            </div>
        );

    }

}

export default Voting;
