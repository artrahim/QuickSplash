import React,{Component} from 'react'
import answer from '../Assets/images/answer.png';
import ImageTextBox from './ImageTextBox';

class Answer extends Component {

    constructor(props){
        super(props);
    }

    render() {
        // return(
        //     <ImageTextBox imgsrc={answer} text={this.props.text} />
        // );
        return(
            <div onClick={this.props.voteHandler(this.props.id)} className="answer">
                <img src={answer} className="image" alt="answer" />
                <h2 className="answerText"> {this.props.text} </h2>
            </div>

        );
    }
}

export default Answer;
