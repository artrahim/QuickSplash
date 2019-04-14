import React from 'react';
import posed, {PoseGroup} from 'react-pose/lib/index';
import styled from "styled-components";

const Container = styled.div`

`;

const MainDiv = posed.div({
    scaled: {
        opacity: 1,
        scaleY: 1,
        transition: {
            opacity: {ease: 'easeOut', duration: 700},
            default: {ease: 'linear', duration: 500}
        }
    },
    noScale: {
        opacity: 0,
        scaleY: 0,
    }

});

class ButtonScale extends React.Component {

    state = {isVisible: false};

    componentDidMount() {
        this.intervalID = setInterval(() => {
            this.setState({isVisible: !this.state.isVisible});
        }, 200);
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
                    <MainDiv className={className} pose={isVisible ? 'scaled' : 'noScale'}  {...props} />
                </Container>
            </PoseGroup>
        );
    }
}

export default ButtonScale;
