import React, {Component} from 'react';

import './intructions.css'

class Instructions extends Component {

    render() {

        return (

            <div className="rootContainer">

                <div className="ins">
                    <div className={"ins-text"}>

                        <p>In every round, a question is given to two player who answer independently</p>
                        <p>After everyone has answered, the two answers are shown anonymously</p>
                        <p>Players who didn’t get that question, vote on their favourite response</p>
                        <p>Points are then split based on the amount of votes the player gets</p>
                    </div>

                </div>

            </div>

        );
    }
}

export default Instructions;
