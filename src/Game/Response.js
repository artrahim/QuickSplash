import React, {Component} from 'react';
import {socket} from "../Router";
import $ from 'jquery';

class Response extends Component {

    constructor()
    {
        super();
        this.respnseHandler = this.respnseHandler.bind(this);
    }

    componentDidMount() {
        //this.id = setTimeout(() => this.props.handleTransition(), 3000);

        // $('form').submit(function(){
        //     socket.emit('chat message', $('#m').val(), user);
        //     $('#m').val('');
        // });
    }

    respnseHandler(event)
    {
        event.preventDefault();
        // send the server a msg saying
        socket.emit("response");
        $('#response').val('');

    }

    render() {
        return (
            <form onSubmit={this.respnseHandler}>
                <input id="response" autoComplete="off"/>
            </form>
        );
    }
}

export default Response;
