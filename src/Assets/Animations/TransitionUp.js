import React from 'react';
import posed, {PoseGroup} from 'react-pose/lib/index';
import styled from "styled-components";

const Container = styled.div`

`;

const MainDiv = posed.div({
    enter: {
        y: 0,
        opacity: 1,
        delay: 300,
        transition: {
            y: {type: 'spring', stiffness: 1000, damping: 15},
            default: {duration: 100}
        }
    },
    exit: {
        y: 50,
        opacity: 0,
        transition: {duration: 150}
    }
});

class TransitionUp extends React.Component {

    state = {isVisible: false};

    componentDidMount() {
        this.intervalID = setInterval(() => {
            this.setState({isVisible: !this.state.isVisible});
        }, 600);
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
                    <MainDiv className={className} pose={isVisible ? 'enter' : 'exit'}  {...props} />
                </Container>
            </PoseGroup>
        );
    }
}

export default TransitionUp;
