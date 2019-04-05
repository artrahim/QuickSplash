import React, {Component} from 'react'
import OtherPlayer from './OtherPlayer'
import silver from '../../Assets/images/silver.png';
import bronze from '../../Assets/images/bronze.png';

class Others extends Component{
    render() {
        return (
            <div id="Others">
                <div className="row">
                    <OtherPlayer othersplash={this.props.splash2} otherFace={this.props.Face2} othermedal={silver} otherusername={this.props.Username2}/>
                    <OtherPlayer othersplash={this.props.splash3} otherFace={this.props.Face3} othermedal={bronze} otherusername={this.props.Username3}/>
                </div>
            </div>
        );
    }   
}

export default Others;