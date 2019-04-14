import React from 'react';
import posed, {PoseGroup} from 'react-pose/lib/index';
import {easing, tween} from "popmotion";
import styled from "styled-components";


const Container = styled.div`

`;
const Image = posed.div({

    // enter: {
    //     scale: 1.3,
    //     transition: {
    //         type: 'spring',
    //         stiffness: 200,
    //         damping: 0,
    //         default: {duration: 50}
    //     }
    // },
    //
    // exit: {
    //     scale: 1,
    // }

    enter: {
        y: 0,
        opacity: 1,
        delay: 300,
        transition: {
            y: { type: 'spring', stiffness: 1000, damping: 15 },
            default: { duration: 300 }
        }
    },
    exit: {
        y: 50,
        opacity: 0,
        transition: { duration: 150 }
    }

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

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {

        const {isVisible} = this.state;

        const {className, ...props} = this.props;

        return (
            <PoseGroup>
                <Container onExit={clearInterval(this.intervalID)} key={window.location} className={className}>
                    <Image className="" pose={isVisible ? 'enter' : 'exit'}  {...props} />
                </Container>
            </PoseGroup>

        );
    }
}

export default ResultsAnimation;
