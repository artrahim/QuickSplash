import React, {Component} from "react";

import Logo from "../../Game/Utilities/Logo";
import Winner from "./Winner";
import Others from "./Others";
import './results.css';
import ResultsAnimation from "../../Assets/Animations/ResultsAnimation";

class ResultMain extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Logo/>
                <ResultsAnimation>
                <div id="Players">
                    <Winner splash1={this.props.top[0]}/>
                    <Others splash2={this.props.top[1]} splash3={this.props.top[2]}/>
                </div>
                </ResultsAnimation>
            </div>
        );
    }
}

export default ResultMain
