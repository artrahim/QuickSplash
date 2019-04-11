import React from 'react';
import posed from 'react-pose';

const Image = posed.img({

    draggable: "x",
    hidden: {opacity: 0},
    visible: {opacity: 1}

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

        const pose = isVisible ? 'visible' : 'hidden';

        return (
            <div className={className}
                onClick={this.animate}>
                <Image pose={pose} {...props} />
            </div>
        );
    }
}

export default Test;
