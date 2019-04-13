import React,{Component} from 'react'
import answer from '../Assets/images/answer.png';
import ImageTextBox from './ImageTextBox';
import {socket} from "../Router";
import $ from "jquery";

class Answer extends Component {

    constructor(props){
        super(props);

        this.vote = this.vote.bind(this);

    }

    /*
    componentWillMount() {
        this.props.hasVoted(false);
    }
     */

    vote() {
        let lobbyCode = this.props.lobbyCode;
        let question = this.props.question;
        let answer = this.props.answer;

        if (!this.props.voteStatus) {
            socket.emit('vote', lobbyCode, question, answer);
        }

        // change the vote status here
        this.props.hasVoted(true);

    }



    render() {
        // return(
        //     <ImageTextBox imgsrc={answer} text={this.props.text} />
        // );
        return(
            <div className="answer" onClick={this.vote}>
                <img src={answer} className="image" alt="answer" />
                <h2 className="answerText"> {this.props.answer} </h2>
            </div>

        );
    }
}

export default Answer;
