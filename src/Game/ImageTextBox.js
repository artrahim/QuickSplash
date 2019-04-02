import React,{Component} from 'react'

class ImageTextBox extends Component {
    render() {
        var textStyle = {
            position: "absolute",
            top: "30%",
            textAlign:"center",
        };
        var imgStyle = {
            maxWidth:"100%",
            maxHeight:"100%",
            margin : "0 0",
            height: "250px"
        };

        return(
            <div className="answer" >
                <img className="image" style={imgStyle} src={this.props.imgsrc} alt="answer" />
                <h2 className="answerText" style={textStyle}> {this.props.text} </h2>
            </div>

        );



    }
}

export default ImageTextBox;
