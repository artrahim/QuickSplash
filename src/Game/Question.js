import React, {Component} from 'react';
import {socket} from '../Router';

import './Prompt.css';

class Question extends Component {

    render() {

        return (
            <div id="question">{this.props.question}</div>
        );

    }

}

export default Question;
