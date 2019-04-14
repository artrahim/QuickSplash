import React, {Component} from 'react'


//import './Home.css';
import PlayerAnimation from "../Assets/Animations/PlayerAnimation";

/*
Makes the player splash.
Random image source.
x and y properties are set in state.
 */

class PlayerSplash extends Component {

    constructor(props) {

        super(props);

        this.state = {
            position: 'absolute',
            top: props.y,
            left: props.x
        };

    }

    componentDidMount() {

        this.setState({
            top: this.props.y,
            left: this.props.x
        })

    }

    render() {

        console.log("new resize" )

        console.log("new x and y " + this.props.x + ' ' + this.props.y)

        const name = this.props.text.toUpperCase();

        return (
            <div style={{
                position: 'absolute',
                top: this.props.y,
                left: this.props.x,
            }}>
                <PlayerAnimation className="player" src={this.props.imagesource} alt="player">
                </PlayerAnimation>
                <div className="playerName"> {name} </div>
            </div>
        )
    }
}

export default PlayerSplash