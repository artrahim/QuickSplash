import React,{Component} from 'react'
import Cookies from "universal-cookie";
import {socket} from "../Router";

import answer from '../Assets/images/answer.jpg';
const createjs = window.createjs;
let props1 = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, volume: 0.5})

const cookies = new Cookies();

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
        createjs.Sound.play("tick", props1);
        let lobbyCode = localStorage.getItem('lobbyCode');
        let question = this.props.question;
        let answer = this.props.answer;

        if (!this.props.hasVoted) {
            socket.emit('vote', lobbyCode, question, answer);
        }

        // change the vote status here
        this.props.hasVoted(true);
        socket.emit('done voting')

    }


    render() {
        return(
            <div className="answer" onClick={this.vote}>
                <img src={answer} className="image" alt="answer" />
                <h2 className="answerText"> {this.props.answer} </h2>
            </div>

        );
    }
}

export default Answer;
