import React, {Component} from 'react';
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
                <div className="center-back">
                    <Timer time={30}/>
                    <Logo/>
                    <div className="empty"/>
                </div>
                <Question question={this.props.question}/>
                <br/>
                <br/>
                <div id='AnswerBox'>
                    <Answer id={1} text={this.props.answer1} voteHandler={this.voteHandler}/>
                    <Answer id={2} text={this.props.answer2} voteHandler={this.voteHandler}/>
                </div>
            </div>
        );

    }

}

export default Voting;
