import React, { Component } from 'react';

import "./Game.css";

import Logo from "../Game/Utilities/Logo";
import {tween, easing, styler, composite, physics} from 'popmotion';



class RoundTransitions extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        const title = document.querySelector('#round-title');
        const logoStyler = styler(title);

        const polarToCartesian = ({ angle, radius }) => ({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)
        });

        composite({
            angle: physics({ velocity: 5 }),
            radius: tween({
                from: 1500,
                to: 0,
                yoyo: 0,
                ease: easing.easeInOut,
                duration: 1000
            })
        }).pipe(polarToCartesian)
            .start(logoStyler.set);

        const explanation = document.querySelector('#explanation');
        const expStyler = styler(explanation);

        composite({
            angle: physics({ velocity: 5 }),
            radius: tween({
                from: -1500,
                to: 0,
                yoyo: 0,
                ease: easing.easeInOut,
                duration: 1000,
                delay: 1000
            })
        }).pipe(polarToCartesian)
            .start(expStyler.set);
    }

    render() {
        let imgsource = '';
        switch (this.props.round){
            case 1:
                imgsource = require('../Assets/images/round1.png');
                break;
            case 2:
                imgsource = require('../Assets/images/round2.png');
                break;
            case 3:
                imgsource = require('../Assets/images/round3.png');
                break;
            case 4:
                imgsource = require('../Assets/images/round4.png');
                break;
            case 5:
                imgsource = require('../Assets/images/round5.png');
                break;
            default:
                imgsource = require('../Assets/images/round2.png');
        }
        return (
            <div>
                <Logo/>
                <img id="round-title" src = {imgsource} alt={"Round "+this.props.round}/>
                <h2 id="explanation">Answer two questions with your most clever response!</h2>
            </div>

        );

    }

}

export default RoundTransitions;
