import React,{Component} from 'react'
import '../../Setup/Home.css';


class ButtonSplash extends Component {

    playTick() {
        const createjs = window.createjs;

        // let tick = "tick";
        // createjs.Sound.registerSound("Tick.ogg", tick);
        let props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY})
        createjs.Sound.play("tick",props);
   }

    render() {
        return (
            <div className = "container">
                <img className="button" src={this.props.imagesource } alt="button">
                </img>
                <div className="textButton"   onMouseOver={this.playTick}> {this.props.text} </div>
            </div>
        )
    }
}

export default ButtonSplash