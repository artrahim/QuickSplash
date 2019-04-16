import React, {Component} from 'react';
import {socket} from '../Router';

import Logo from "../Game/Utilities/Logo";
import Timer from './Utilities/Timer';
import Question from './Question';
import Answer from './Answer';

import './Voting.css';


class VoteResult extends Component {

    constructor() {
        super();
    }

    componentDidMount() {

    }


    render() {

        return (
            <div>
                <Logo/>
                <h1>RESULTS</h1>
                <Question question={this.props.question}/>
                <br/>
                <br/>
                <div id='AnswerBox'>
                    <Answer voting={false} answer={this.props.answer1} question={this.props.question} voteStatus={false}
                            hasVoted={null}/>
                    <Answer voting={false} answer={this.props.answer2} question={this.props.question} voteStatus={false}
                            hasVoted={null}/>
                </div>
                <div id="vote-result">
                    <div id="votes-left">
                        <h2>{this.props.votes1}</h2>
                    </div>
                    <div id="votes-right">
                        <h2>{this.props.votes2}</h2>
                    </div>
                </div>
            </div>
        );

    }

}

export default VoteResult;
