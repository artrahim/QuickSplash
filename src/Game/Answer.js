import React,{Component} from 'react'
import answer from '../Assets/images/answer.png';
import i from '../Assets/images/redSplash.png';
import ImageTextBox from './ImageTextBox';

class Answer extends Component {
    render() {
        return(
            <ImageTextBox imgsrc={answer} text={this.props.text}/>
        );
    }
}

export default Answer;
