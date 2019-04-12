import React, {Component} from 'react'
import '../../Setup/Home.css';

import {tween, easing, styler, composite, spring} from 'popmotion';

class ButtonSplash extends Component {

    constructor(props) {
        super(props);

        this.playTick = this.playTick.bind(this);

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
        const createjs = window.createjs;

        // let tick = "tick";
        // createjs.Sound.registerSound("Tick.ogg", tick);
        let props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY})
        createjs.Sound.play("tick", props);
    }

    render() {
        return (
            <div className="container" >
                <img className="button" src={this.props.imagesource} alt="button" onMouseOver={this.playTick}>
                </img>
                <div className="textButton" > {this.props.text} </div>
            </div>
        )
    }
}

export default ButtonSplash