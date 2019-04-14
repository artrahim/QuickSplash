import React from 'react';
import posed from 'react-pose/lib/index';
import {easing} from "popmotion";


const Image = posed.img({
    small: {scale: 1, easings: easing.easeInOut},
    big: {scale: 1.2, easings: easing.easeInOut}
});

class PlayerAnimation extends React.Component {

    state = {isSmall: true};

    componentDidMount() {
        // Change the state (visible, hidden) every second
        setInterval(() => {
            this.setState({isSmall: !this.state.isSmall});
        }, 550);
    }

    render() {
        const {isSmall} = this.state;

        const {className, ...props} = this.props;

        return (
            <div className={className}>
                <Image className="player" pose={isSmall ? 'small' : 'big'}  {...props} />
            </div>
        );
    }
}

export default PlayerAnimation;
