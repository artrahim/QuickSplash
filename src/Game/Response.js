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
            count: 0
        };

        this.responseHandler = this.responseHandler.bind(this);
    }

    componentDidMount() {
        //this.id = setTimeout(() => this.props.handleTransition(), 3000);
    }

    async responseHandler(event)
    {
        let nickname = cookies.get('username').nickname;
        let lobbyCode = localStorage.getItem('lobbyCode');

        event.preventDefault();
        await this.setState({count: (this.state.count + 1) % 2});
        // send the server a msg saying
        if(this.state.count === 1) {
            socket.emit("response", nickname, $('#response').val(), this.props.question, lobbyCode);
        } else {
            socket.emit("roundOver", nickname, $('#response').val(), this.props.question, lobbyCode);
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
