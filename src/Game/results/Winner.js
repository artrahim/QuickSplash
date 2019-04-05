import React, {Component} from 'react'
import gold from '../../Assets/images/gold.png';

class Winner extends Component{
    render() {
        return (
            <div id="Winner">
                <img id="first" src={this.props.splash1} alt="Winner ColorSplash" />
                <img id="gold" src={gold} alt="goldmedal" />
                <img id="face1" src={this.props.Face1} alt="Winner Avater" />
                <p id="Username">{this.props.Username1}</p>
            </div>
        );
    }   
}

export default Winner;