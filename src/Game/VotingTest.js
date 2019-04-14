import React, {Component} from 'react';
import ResultMain from "./results/ResultMain";
import Timer from "./Utilities/Timer";
import Logo from "./Utilities/Logo";
import Question from "./Question";

import './Voting.css';
import Answer from "./Answer";

class VotingTest extends Component {


    render() {

        return (

            <div>
                <div className="center-back">
                    {/*<Timer time={this.props.time}/>*/}
                    <Logo/>
                    <div className="empty"/>
                </div>
                <Question question={'some random question...'}/>
                <br/>
                <br/>
                <div id='AnswerBox'>
                    <Answer id={1} answer={'some guys answer'} question={'question 1'}
                            voteStatus={false} hasVoted={false}/>
                    <Answer id={2} answer={'answer 2'} question={'question 2'}
                            voteStatus={false} hasVoted={false}/>
                </div>
            </div>

        );

    }

}

export default VotingTest;
