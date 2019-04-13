import React from 'react';
import posed from 'react-pose';


// import {tween, easing} from 'popmotion';


// const Frame = posed.div({
//     init: {
//         applyAtEnd: {display: 'none'},
//         opacity: 0
//     },
//     zoom: {
//         applyAtStart: {display: 'block'},
//         opacity: 1
//     }
// });

// const {easing, tween, styler} = window.popmotion;


const transition = {
    duration: 400,
    ease: [0.08, 0.69, 0.2, 0.99]
};

// tween ({
//     from: 0,
//     to: {x: 300, rotate: 180},
//     duration: 1000,
//     ease: easing.backOut,
//     flip: Infinity,
//     // elapsed: 500,
//     // loop: 5,
//     // yoyo: 5
// });
const Image = posed.img({
    // init: {
    //     //     // position: 'static',
    //     //     // width: 'auto',
    //     //     // height: 'auto',
    //     //     // transition,
    //     //     // flip: true
    //     // },
    draggable: "x",
    hidden: {opacity: 0},
    visible: {opacity: 1},
    trans: transition
    // transition: {
    //     opacity: {ease: 'easeOut', duration: 300},
    //     default: {ease: 'linear', duration: 500}
    // }

});

class Test extends React.Component {

    state = {isVisible: true};

    componentDidMount() {
        // Change the state (visible, hidden) every second
        setInterval(() => {
            this.setState({isVisible: !this.state.isVisible});
        }, 1000);
    }


    render() {
        const {isVisible} = this.state;

        const {className, ...props} = this.props;

        const pose = "visible";

        // console.log("dkfjsdfsjfhj")

        return (
            <div className={className}
                onClick={this.animate}>
                {/*<Frame pose={pose} className="frame"/>*/}
                <Image pose={pose} {...props} />
            </div>
        );
    }
}

export default Test;
