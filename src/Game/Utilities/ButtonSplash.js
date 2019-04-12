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

    // hover() {
    //     this.scaleUpAnimation();
    //     this.playTick();
    //
    // }
    //
    // scaleUpAnimation() {
    //     const button = document.querySelector('.container');
    //     const buttonStyler = styler(button);
    //
    //     if (this.timeoutOnMouseOver) {
    //         clearTimeout(this.timeoutOnMouseOver);
    //     }
    //     this.timeoutOnMouseOver = setTimeout(() => {
    //         tween({
    //             to: 1.5,
    //             duration: 300,
    //             ease: easing.easeOut
    //         }).start(buttonStyler.set('scale'));
    //
    //         this.timeoutOnMouseOver = false;
    //     }, 300);
    //
    // }
    //
    // scaleDownAnimation() {
    //     const button = document.querySelector('.container');
    //     const buttonStyler = styler(button);
    //     tween({
    //         to: 1,
    //         duration: 300,
    //         ease: easing.easeOut
    //     }).start(buttonStyler.set('scale'));
    // }

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