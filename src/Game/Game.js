import React, { Component } from 'react';
import {socket} from '../Router';

import Waiting from "./Waiting";
import RoundTransitions from "./RoundTransitions";
import Prompt from "./Prompt";
import Voting from "./Voting";
import Resultmain from "./results/resultmain";
import PlayerSplash from "../Setup/PlayerSplash";

class Game extends Component {

    constructor(props) {

        super(props);
        this.state = {
            stage: 0,
            hasStarted: false,
            round: 0,
            timePerRound: 0,
            question1: "",
            question2: "",
            timeToVote: 0,
            beingVotedOn: "",
            answer1: "",
            answer2: "",
            first: "",
            second: "",
            third: ""
        };

    }

    componentDidMount(){

        socket.on('roundTransition', () => {
            this.setState(state => ({
              hasStarted: true,
              round: this.round+=1,
              stage: 1
            }));
        });

        socket.on('prompt1', (first, second, time) => {
            this.setState(state => ({
                timePerRound: time,
                question1: first,
                question2: second,
                stage: 2,
            }));
            console.log("1st Question:\t", this.state.question1);
            console.log("2nd Question:\t", this.state.question2);
        });

        socket.on('prompt2', () => {
            this.setState(state => ({
                stage: 3
            }));
        });

        socket.on('waiting2', () => {
            this.setState(state => ({
                stage: 4
            }));
        });

        socket.on('vote', (question, time, a1, a2) => {
            this.setState(state => ({
                beingVotedOn: question,
                timeToVote: time,
                answer1: a1,
                answer2: a2,
                stage: 5
            }));
        });

        socket.on('result', (p1, p2, p3) => {
            this.setState(state => ({
                first: p1,
                second: p2,
                third: p3,
                stage: 6
            }));
        });

    }

    render() {
        //render correct stage based on game state
        //states are represented by numbers (0 to 6)
        let component = null;
        let nickname = this.props.location.state.nickname;
        let lobbyCode = this.props.location.state.lobbyCode;
        let isCreator = this.props.location.state.isCreator;
        switch (this.state.stage){
            case 1:
                //component = <RoundTransitions handleTransition = {() => this.handleClick()}/>;
                component = <RoundTransitions/>;
                break;
            case 2:
                //component = <Prompt handleTransition = {() => this.handleClick()}/>;
                component = <Prompt nickname={nickname} code={lobbyCode} time={this.state.timePerRound} question={this.state.question1}/>;
                break;
            case 3:
                //component = <Prompt handleTransition = {() => this.handleClick()}/>;
                component = <Prompt nickname={nickname} code={lobbyCode} time={this.state.timePerRound} question={this.state.question2}/>;
                break;
            case 4:
                component = <Waiting isCreator={this.state.isCreator} hasStarted={true}/>;
                break;
            case 5:
                component = <Voting time={this.state.timeToVote} question={this.state.beingVotedOn} answer1={this.state.answer1} answer2={this.state.answer2} lobbyCode={lobbyCode}/>;
                break;
            case 6:
                component = <Resultmain first={this.state.first} second={this.state.second} third={this.state.third}/>;
                break;
            default:
                component = <Waiting nickname={nickname} lobbyCode={lobbyCode} isCreator={isCreator} hasStarted={false}/>;
        }

        return (
            <div className="game">
                {component}
                {/*<PlayerSplash imagesource={require("../Assets/images/" + this.props.location.state.colour + ".png")} text={nickname} x={100} y={200}/>*/}
            </div>
        );

    }

}

export default Game;
