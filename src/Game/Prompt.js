import React, {Component} from 'react';

import Logo from "../Game/Utilities/Logo";
import Timer from './Utilities/Timer';
import Question from './Question';
import Response from './Response';

class Prompt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        //this.id = setTimeout(() => this.props.handleTransition(), 3000);
    }

    componentWillUnmount() {
        // !!!
        // clearTimeout(this.id);
    }

    render() {

        return (
            <div id="prompt">
                <div className="center-back">
                    <Timer question1={this.props.question} question2={this.props.question2} time={this.props.time}/>
                    <Logo/>
                    <div className="empty"/>
                </div>
                <Question question={this.props.question}/>
                <br/>
                <br/>
                <Response question={this.props.question}/>
            </div>
        );

    }

}

export default Prompt;
