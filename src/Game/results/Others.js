import React, {Component} from 'react'

import silver from '../../Assets/images/silver.png';
import bronze from '../../Assets/images/bronze.png';

class Others extends Component{
    render() {
        return (
            <div id="Others">
                <div className="row">
                    <div className="column">
                        <img id="otherPlayer" src={this.props.splash2} alt="2nd ColorSplash" />
                        <img id="othermedals" src={silver} alt="silvermedal" />
                        <img id="otherface" src={this.props.Face2} alt="2nd place avatar" />
                        <p id="otherusername">{this.props.Username2}</p>
                    </div>
                    <div className="column">
                        <img id="otherPlayer" src={this.props.splash3} alt="3rd ColorSplash" />
                        <img id="othermedals" src={bronze} alt="bronzemedal" />
                        <img id="otherface" src={this.props.Face3} alt="3rd place avatar" />
                        <p id="otherusername">{this.props.Username3}</p>
                    </div>
                </div>
            </div>
        );
    }   
}

export default Others;