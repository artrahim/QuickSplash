import React, {Component} from 'react'

class Winner extends Component{
    render() {
        return (
            <div id="Winner">
                <img id="firstSplash" src={this.props.splash1} alt="Winner ColorSplash" />
                <img id="goldmedal" src={ require('../../Assets/images/gold.png')} alt="goldmedal" />
                <img id="face1" src={this.props.Face1} alt="Winner Avater" />
                <p id="firstusername">{this.props.Username1}</p>
            </div>
        );
    }   
}

export default Winner;