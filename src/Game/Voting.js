import React, {Component} from 'react';
import {socket} from '../Router';

import Logo from "../Game/Utilities/Logo";
import Timer from './Utilities/Timer';
import Question from './Question';
import Answer from './Answer';

import './Voting.css';


class Voting extends Component {

    constructor()
    {
        super();
        this.state = {
            voted: false
        };
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

        let component = null;
        switch(this.props.canVote){
            case true:
                component =
                <div id='AnswerBox'>
                    <Answer voting={true} answer={this.props.answer1} question={this.props.question} voteStatus={this.state.voted} hasVoted={this.hasVoted}/>
                    <Answer voting={true} answer={this.props.answer2} question={this.props.question} voteStatus={this.state.voted} hasVoted={this.hasVoted}/>
                </div>;
                break;
            case false:
                component =
                    <div>
                        <h1>YOU CAN'T VOTE ON THIS ONE</h1>
                        <div id='AnswerBox'>
                            <Answer voting={false} answer={this.props.answer1} question={this.props.question} voteStatus={this.state.voted} hasVoted={this.hasVoted}/>
                            <Answer voting={false} answer={this.props.answer2} question={this.props.question} voteStatus={this.state.voted} hasVoted={this.hasVoted}/>
                        </div>;
                    </div>;

                break;
        }

        return (
            <div>
                <Logo/>
                <h1>VOTING</h1>
                <Question question={this.props.question}/>
                <br/>
                <br/>
                {component}
            </div>
        );

    }

}

export default Voting;
