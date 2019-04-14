import React from 'react';
import posed, {PoseGroup} from 'react-pose/lib/index';
import {easing, tween} from "popmotion";
import styled from "styled-components";


const Container = styled.div`

`;
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
        this.intervalID = setInterval(() => {
            this.setState({
                isVisible: !this.state.isVisible
            });
        }, 2000);
    }


    render() {

        const {isVisible} = this.state;

        const {className, ...props} = this.props;

        return (
            <PoseGroup>
                <Container  key={window.location} className={className}>
                    <Image className="" pose={isVisible ? 'enter' : 'exit'}  {...props} />
                </Container>
            </PoseGroup>



        );
    }
}

export default ResultsAnimation;
