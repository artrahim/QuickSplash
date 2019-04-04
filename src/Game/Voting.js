import React, { Component } from 'react';
import {socket} from '../Router';

import Timer from './Utilities/Timer'
import AnswerBox from './AnswerBox';
import Answer from './Answer';
import Question from './Question';

import './Voting.css';

class Voting extends Component {

    render() {

        return (
            <div>
                <Timer/>
                <Question question={"What is the worst place to be naked?"}/>
                <AnswerBox answer1="sample1" answer2="sample2"/>
            </div>
        );

    }

}

export default Voting;
