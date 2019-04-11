import React, {Component} from 'react';
import {socket} from '../Router';

import Logo from "../Game/Utilities/Logo";

import Timer from './Utilities/Timer';
import Question from './Question';
import AnswerBox from './AnswerBox';

import './Voting.css';

// import Results from './Results';

class Voting extends Component {

    render() {

        return (
            <div>
                <div className="center-back">
                    <Timer time={30}/>
                    <Logo/>
                    <div className="empty"/>
                </div>
                <Question question={"What is the worst place to be naked?"}/>
                <br/>
                <br/>
                <AnswerBox answer1="sample1" answer2="sample2"/>
            </div>
        );

    }

}

export default Voting;
