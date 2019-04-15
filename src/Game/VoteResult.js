import React, {Component} from 'react';
import {socket} from '../Router';

import Logo from "../Game/Utilities/Logo";
import Timer from './Utilities/Timer';
import Question from './Question';
import Answer from './Answer';

import './Voting.css';


class VoteResult extends Component {

    constructor()
    {
        super();
    }

    componentDidMount() {

    }


    render() {

        return (
            <div>
                <Logo/>
                <Question question={this.props.question}/>
                <br/>
                <br/>
                <h1>{this.props.answer1}</h1>
                <h1>{this.props.answer2}</h1>
                <h2>{this.props.votes1}</h2>
                <h2>{this.props.votes2}</h2>
            </div>
        );

    }

}

export default VoteResult;
