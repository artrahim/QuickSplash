import React from 'react';
import posed, {PoseGroup} from 'react-pose/lib/index';
import styled from "styled-components";


const Container = styled.div`

`;
const Input = posed.input({
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


class ResponseAnimation extends React.Component {

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
                    <Input className="" pose={isVisible ? 'enter' : 'exit'}  {...props} />
                </Container>
            </PoseGroup>

        );
    }
}

export default ResponseAnimation;
