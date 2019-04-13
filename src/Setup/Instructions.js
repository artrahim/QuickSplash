import React, {Component} from 'react';

class Instructions extends Component {

    render() {

        return (

            <div className="">

                In every round, a question is given to two player who answer independently
                <br/>
                After everyone has answered, the two answers are shown anonymously<br/>
                Players who didn’t get that question, vote on their favourite response<br/>
                Points are then split based on the amount of votes the player gets.

            </div>

        );
    }
}

export default Instructions;
