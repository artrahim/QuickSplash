import React, {Component} from 'react'
import '../../Setup/Home.css';

import {tween, easing, styler, composite, spring} from 'popmotion';

const createjs = window.createjs;

class ButtonSplash extends Component {

    constructor(props) {
        super(props);

        this.playTick = this.playTick.bind(this);
        this.playSplash = this.playSplash.bind(this);

    }

    playTick() {
        createjs.Sound.play("tick");
    }

    playSplash() {
        createjs.Sound.play("splash");
    }

    render() {
        return (
            <div className="container" >
                <img className="button" src={this.props.imagesource} alt="button" >
                </img>
                <div className="textButton" onClick={this.playSplash} onMouseOver={this.playTick}> {this.props.text} </div>
            </div>
        )
    }
}

export default ButtonSplash