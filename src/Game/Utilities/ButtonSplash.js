import React, {Component} from 'react'
import '../../Setup/Home.css';

import {tween, easing, styler, composite, spring} from 'popmotion';

const createjs = window.createjs;
let props1 = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,volume: 0.5})


class ButtonSplash extends Component {

    constructor(props) {
        super(props);

        this.playTick = this.playTick.bind(this);
    }

    playTick() {
        createjs.Sound.play("tick",props1);
    }

    render() {
        return (
            <div className="container" >
                <img className="button" src={this.props.imagesource} alt="button" >
                </img>
                <div className="textButton" onClick={this.playTick} onMouseOver={this.playTick}> {this.props.text} </div>
            </div>
        )
    }
}

export default ButtonSplash