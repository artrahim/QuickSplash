import React, {Component} from 'react';
import Cookies from "universal-cookie";
import {socket} from "../Router";
import $ from 'jquery';
import ResponseAnimation from "../Assets/Animations/ResponseAnimation";

const cookies = new Cookies();

const createjs = window.createjs;
let props1 = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, volume: 0.5})


class Response extends Component {

    constructor()
    {
        super();
        this.state = {
            count: 0
        };

        this.responseHandler = this.responseHandler.bind(this);
    }

    componentDidMount() {
        //this.id = setTimeout(() => this.props.handleTransition(), 3000);
    }


    async responseHandler(event)
    {
        let nickname = cookies.get('username').nickname + '';
        console.log(nickname);
        let lobbyCode = localStorage.getItem('lobbyCode');

        event.preventDefault();
        await this.setState({count: (this.state.count + 1)});
        // send the server a msg saying
        if(this.props.stage === 2) {
            let isEmpty = false;
            socket.emit("response", nickname, $('#response').val(), this.props.question1, lobbyCode, isEmpty);
            localStorage.setItem('answered', "1");
            /*this.setState(state => ({
                answered: 1
            }));*/
        } else if(this.props.stage === 3) {
            let isEmpty = false;
            socket.emit("response2", nickname, $('#response').val(), this.props.question2, lobbyCode, isEmpty);
            localStorage.setItem('answered', "2");
            /*this.setState(state => ({
                answered: 2,
            }));*/
        }
        $('#response').val('');

    }

    playTick() {
        createjs.Sound.play("tick", props1);
    }

    render() {
        return (
            <form onSubmit={this.responseHandler}>
                <ResponseAnimation onClick={this.playTick} id="response" autoComplete="off"/>
            </form>
        );
    }
}

export default Response;
