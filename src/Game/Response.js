import React, {Component} from 'react';
import Cookies from "universal-cookie";
import {socket} from "../Router";
import $ from 'jquery';

const cookies = new Cookies();

class Response extends Component {

    constructor()
    {
        super();
        this.state = {
            answered: false,
        };

        this.responseHandler = this.responseHandler.bind(this);
    }

    componentDidMount() {
        //this.id = setTimeout(() => this.props.handleTransition(), 3000);
        socket.on('checkNoResponse', () => {
            let nickname = cookies.get('username').nickname + '';
            console.log(nickname);
            let lobbyCode = localStorage.getItem('lobbyCode');

            if(this.props.stage === 2) {
                let isEmpty = true;
                socket.emit("response", nickname, '-', this.props.question1, lobbyCode, isEmpty);
                socket.emit("response2", nickname, '-', this.props.question2, lobbyCode);
            }
            else if(this.props.stage === 3) {
                socket.emit("response2", nickname, '-', this.props.question2, lobbyCode);
            }
        });
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
        } else if(this.props.stage === 3) {
            socket.emit("response2", nickname, $('#response').val(), this.props.question2, lobbyCode);
        }
        $('#response').val('');

    }

    render() {
        return (
            <form onSubmit={this.responseHandler}>
                <input id="response" autoComplete="off"/>
            </form>
        );
    }
}

export default Response;
