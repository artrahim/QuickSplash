import React from 'react';
import posed from 'react-pose/lib/index';
import {easing, tween} from "popmotion";


const Image = posed.img({

    enter: {
        y: 0,
        opacity: 1,
        delay: 300,
        transition: {
            y: {type: 'spring', stiffness: 1000, damping: 15},
            default: {duration: 300}
        }
    },
    exit: {
        y: 50,
        opacity: 0,
        transition: {duration: 150}
    }

});

const Shade = posed.div({
    enter: {opacity: 1},
    exit: {opacity: 0}
});


class ResultsAnimation extends React.Component {

    state = {isVisible: false};

    componentDidMount() {
        setInterval(() => {
            this.setState({
                isVisible: !this.state.isVisible
            });
        }, 2000);
    }


    render() {

        const {isVisible} = this.state;

        const {className, ...props} = this.props;
        //
        // <PoseGroup>
        //     {isVisible && [
        //         // If animating more than one child, each needs a `key`
        //         <Shade key="shade" className="shade"/>,
        //         <Modal key="modal" className="modal"/>
        //     ]}
        // </PoseGroup>

        return (
            <poseGroup>
                <div className={className}>
                    <Image className="player" pose={'flip'}  {...props} />
                </div>
            </poseGroup>
        );
    }
}

export default ResultsAnimation;
