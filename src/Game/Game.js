import React, { Component } from 'react';
import {socket} from '../Router';

import Waiting from "./Waiting";
import RoundTransitions from "./RoundTransitions";
import Prompt from "./Prompt";
import Voting from "./Voting";
import Resultmain from "./results/resultmain";

class Game extends Component {

    constructor() {

        super();
        this.state = {
            stage: 0,
            hasStarted: false,
            round: 0,
            timePerRound: 0,
            question1: "",
            question2: "",
            answer1: ""
        };

    }

    componentDidMount(){
        socket.on('waiting1', () => {
            this.setState(state => ({
              stage: 0
            }));
        });

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

        socket.on('vote', () => {
            this.setState(state => ({
              stage: 5
            }));
        });

        socket.on('result', () => {
            this.setState(state => ({
              stage: 6
            }));
        });

    }

    render() {
        //render correct stage based on game state
        //states are represented by numbers (0 to 6)
        let component = null;
        switch (this.state.stage){
            case 0:
                component = <Waiting lobbyCode={this.props.location.state.lobbyCode} isCreator={this.props.location.state.isCreator} hasStarted={false}/>;
                break;
            case 1:
                //component = <RoundTransitions handleTransition = {() => this.handleClick()}/>;
                component = <RoundTransitions/>;
                break;
            case 2:
                //component = <Prompt handleTransition = {() => this.handleClick()}/>;
                component = <Prompt time={this.state.timePerRound} question={this.state.question1}/>;
                break;
            case 3:
                //component = <Prompt handleTransition = {() => this.handleClick()}/>;
                component = <Prompt time={this.state.timePerRound} question={this.state.question2}/>;
                break;
            case 4:
                component = <Waiting isCreator={this.state.isCreator} hasStarted={true}/>;
                break;
            case 5:
                component = <Voting/>;
                break;
            case 6:
                component = <Resultmain/>;
                break;
            default:
                component = <Waiting isCreator={true} hasStarted={false}/>;
        }

        return (
            <div>
                {component}
            </div>
        );

    }

}

export default Game;
