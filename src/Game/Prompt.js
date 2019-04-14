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

        let question = null;
        switch (this.props.stage) {
            case 2:
                question = <Question question={this.props.question1}/>
                break;
            case 3:
                question = <Question question={this.props.question2}/>
                break;
        }
        return (
            <div id="prompt">
                <div className="center-back">
                    <Timer time={this.props.time}/>
                    <Logo/>
                    <div className="empty"/>
                </div>
                {question}
                <br/>
                <br/>
                <Response stage={this.props.stage} time={this.props.time} question1={this.props.question1} question2={this.props.question2}/>
            </div>
        );

    }

}

export default Prompt;
