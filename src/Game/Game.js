import React, { Component } from 'react';
import Logo from "../Game/Utilities/Logo";
import {socket} from '../Router';

import Prompt from "./Prompt";
import Voting from "./Voting";

class Game extends Component {

    constructor() {
        super();
        this.state = {
            stage: 2
        };
    }

    render() {
        let component = null;
        switch (this.state.stage){
            case 1:
                component = <Prompt/>;
                break;
            case 2:
                component = <Voting/>;
                break;
        }

        return (
            <div>
                <Logo/>
                {component}
            </div>
        );

    }

}

export default Game;
