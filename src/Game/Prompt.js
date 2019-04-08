import React, { Component } from 'react';
import {socket} from '../Router';

import Timer from './Utilities/Timer'
import Question from './Question';
import Response from './Response';

class Prompt extends Component {

    render() {

        return (
            <div>
                <Timer/>
                <Question question={'Where is the worst place to be naked?'}/>
                <br/>
                <br/>
                <Response/>
            </div>
        );

    }

}

export default Prompt;
