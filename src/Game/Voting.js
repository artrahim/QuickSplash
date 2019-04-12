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
        this.state = {
            voted: false
        };
        //this.voteHandler = this.voteHandler.bind(this);
        this.hasVoted = this.hasVoted.bind(this);
    }

    componentDidMount() {
        socket.on('reset', () => {
            this.setState(state => ({
                voted: false
            }));
        });
    }

    hasVoted(state){
        this.setState({voted: state});
    }

    render() {

        return (
            <div>
                <div className="center-back">
                    <Timer time={this.props.time}/>
                    <Logo/>
                    <div className="empty"/>
                </div>
                <Question question={this.props.question}/>
                <br/>
                <br/>
                <div id='AnswerBox'>
                    <Answer lobbyCode={this.props.lobbyCode} id={1} answer={this.props.answer1} question={this.props.question} voteStatus={this.state.voted} hasVoted={this.hasVoted}/>
                    <Answer lobbyCode={this.props.lobbyCode} id={2} answer={this.props.answer2} question={this.props.question} voteStatus={this.state.voted} hasVoted={this.hasVoted}/>
                </div>
            </div>
        );

    }

}

export default Voting;
