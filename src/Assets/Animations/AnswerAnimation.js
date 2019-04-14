import React from 'react';
import posed, {PoseGroup} from 'react-pose/lib/index';
import styled from "styled-components";

const Container = styled.div`

`;

const MainDiv = posed.div({
    focusable: true,
    init: {
        color: '#aaa',
        outlineWidth: '0px',
        outlineOffset: '0px',
        scale: 1
    },
    focus: {
        color: '#000',
        outlineWidth: '12px',
        outlineOffset: '5px',
        outlineColor: '#AB36FF',
        scale: 1.2
    }

});

class AnswerAnimation extends React.Component {

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
                <Container  key={window.location} className={className}>
                    <MainDiv className={className} pose={isVisible ? 'init' : 'focus'}  {...props} />
                </Container>
            </PoseGroup>
        );
    }
}

export default AnswerAnimation;
