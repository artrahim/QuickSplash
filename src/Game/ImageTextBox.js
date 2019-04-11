import React, {Component} from 'react'

class ImageTextBox extends Component {

    constructor (props) {
        super();
    }

    render() {
        return(
            <div className="answer">
                <img src={this.props.imgsrc} className="image" alt="answer" />
                <h2 className="answerText"> {this.props.text} </h2>
            </div>

        );
    }

}

export default ImageTextBox;
