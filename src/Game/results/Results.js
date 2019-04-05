import React, {Component} from "react";
import './results.css';
import Winner from './Winner';
import Others from './Others';


class Results extends Component {
    render() {
        return (
            <div>
                <div id="Players">
                    <Winner splash1={this.props.splash1} Face1={this.props.Face1} Username1={this.props.Username1}/>
                    <Others splash2={this.props.splash2} Face2={this.props.Face2} Username2={this.props.Username2}
                    splash3={this.props.splash3} Face3={this.props.Face3} Username3={this.props.Username3}/> 
                </div>
            </div>
        );
    }
}

export default Results