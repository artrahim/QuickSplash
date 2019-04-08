import React, { Component } from 'react';
import {socket} from '../Router';

import Logo from "../Game/Utilities/Logo";
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
            isCreator: false,
            isStarted: false,
            round: 1,
            question1: "",
            question2: "",
            hasAnswered: false,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
          stage: (state.stage += 1) % 7
        }));
    }

    render() {
        let component = null;
        switch (this.state.stage){
            case 0:
                component = <Waiting isCreator={true} isStarted={false}/>;
                break;
            case 1:
                component = <RoundTransitions/>;
                break;
            case 2:
                component = <Prompt/>;
                break;
            case 3:
                component = <Prompt/>
                break;
            case 4:
                component = <Waiting isCreator={true} isStarted={true}/>;
                break;
            case 5:
                component = <Voting/>;
                break;
            case 6:
                component = <Resultmain/>;
                break;
            default:
                component = <Waiting isCreator={true} isStarted={false}/>;
        }

        return (
            <div>
                <button onClick={this.handleClick}>
                    Switch stage
                </button>
                <Logo/>
                {component}
            </div>
        );

    }

}

export default Game;
