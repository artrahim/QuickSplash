import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Cookies from "universal-cookie";
import {socket} from '../Router';

import Logo from "../Game/Utilities/Logo";
import Waiting from "./Waiting";
import RoundTransitions from "./RoundTransitions";
import Prompt from "./Prompt";
import Voting from "./Voting";
import ResultMain from "./results/ResultMain";

import './Game.css';

const cookies = new Cookies();

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
            canVote: true,
            answer1: "",
            answer2: "",
            players: []
        };

    }

    componentDidMount(){

        socket.on('roundTransition', () => {
            let currentRound = this.state.round;
            currentRound++;
            this.setState(state => ({
                hasStarted: true,
                round: currentRound,
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

        socket.on('vote', (question, time, a1, a2, p1, p2) => {
            let thisPlayer = cookies.get('username').nickname;
            let temp = true;
            if (thisPlayer === p1 || thisPlayer === p2){
                temp = false;
            }
            console.log("Player1", p1);
            console.log("Player2", p2);
            console.log("Me", thisPlayer);
            this.setState(state => ({
                beingVotedOn: question,
                timeToVote: time,
                answer1: a1,
                answer2: a2,
                canVote: temp,
                stage: 5
            }));
        });

        socket.on('result', (winners) => {

            console.log("<<<<>>>>>")

            console.log(winners);

            this.setState(state => ({
                players: winners,
                stage: 6
            }));
        });

        socket.on('endGame', () => {
            this.setState(state => ({
                stage: 7
            }));
            let a;
            if (localStorage.getItem('codes') === null){
                a = [];
            }
            else{
                a = JSON.parse(localStorage.getItem('codes'));
                let thisLobby = localStorage.getItem('lobbyCode');
                let index = a.indexOf(thisLobby);
                a.splice(index, 1);
            }
        });

    }

    render() {
        //render correct stage based on game state
        //states are represented by numbers (0 to 6)
        let component = null;
        let thisLobby = localStorage.getItem('lobbyCode');
        let a;
        if (localStorage.getItem('codes') === null){
            a = [];
        }
        else{
            a = JSON.parse(localStorage.getItem('codes'));
        }
        let isCreator = false;
        if (a.includes(thisLobby)){
            isCreator = true;
        }
        switch (this.state.stage){
            case 1:
                //component = <RoundTransitions handleTransition = {() => this.handleClick()}/>;
                component = <RoundTransitions round={this.state.round}/>;
                break;
            case 2:
                //component = <Prompt handleTransition = {() => this.handleClick()}/>;
                component = <Prompt stage={this.state.stage} time={this.state.timePerRound} question={this.state.question1} question2={this.state.question2}/>;
                break;
            case 3:
                //component = <Prompt handleTransition = {() => this.handleClick()}/>;
                component = <Prompt stage={this.state.stage} time={this.state.timePerRound} question={this.state.question2}/>;
                break;
            case 4:
                component = <Waiting isCreator={isCreator} hasStarted={true}/>;
                break;
            case 5:
                component = <Voting time={this.state.timeToVote} question={this.state.beingVotedOn} answer1={this.state.answer1} answer2={this.state.answer2} canVote={this.state.canVote}/>;
                break;
            case 6:
                component = <ResultMain top={this.state.players}/>;
                break;
            case 7:
                component =  <Redirect to={{
                    pathname: '/'
                }}/>;
                break;
            default:
                component = <Waiting isCreator={isCreator} hasStarted={false}/>;
        }

        return (
            <div className="game">
                {component}
            </div>
        );

    }

}

export default Game;
