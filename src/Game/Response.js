import React, {Component} from 'react';
import {socket} from "../Router";
import $ from 'jquery';

class Response extends Component {

    constructor()
    {
        super();
        this.state = {
            count:0
        };


        this.respnseHandler = this.respnseHandler.bind(this);
    }

    componentDidMount() {
        //this.id = setTimeout(() => this.props.handleTransition(), 3000);

        // $('form').submit(function(){
        //     socket.emit('chat message', $('#m').val(), user);
        //     $('#m').val('');
        // });
    }

    async respnseHandler(event)
    {
        event.preventDefault();
        await this.setState({count: (this.state.count + 1) % 2});
        // send the server a msg saying
        $('#response').val('');
        if(this.state.count === 1) {
            socket.emit("response");
        } else {
            socket.emit("roundOver")
        }

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
