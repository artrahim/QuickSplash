import React,{Component} from 'react'
import '../../Setup/Home.css';


class ButtonSplash extends Component {
    render() {
        return (
            <div className = "container">
                <img className="button" src={this.props.imagesource } alt="button">
                </img>
                <div className="textButton"> {this.props.text} </div>
            </div>
        )
    }
}

export default ButtonSplash