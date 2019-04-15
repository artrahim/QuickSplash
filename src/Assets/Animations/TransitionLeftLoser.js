import React from 'react';
import posed, {PoseGroup} from 'react-pose/lib/index';
import styled from "styled-components";

const Container = styled.div`

`;

const MainDiv = posed.div({
    enter: {x: 0, opacity: 1},
    exit: {x: 1000, opacity: 0}
});

class TransitionLeftLoser extends React.Component {

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

        console.log("class = " + className)

        return (
            <PoseGroup>
                <Container onExit={clearInterval(this.intervalID)} key={window.location} className={className}>
                    <MainDiv className={className} pose={isVisible ? 'enter' : 'exit'}  {...props} />
                </Container>
            </PoseGroup>
        );
    }
}

export default TransitionLeftLoser;
