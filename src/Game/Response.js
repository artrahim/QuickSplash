import React, {Component} from 'react'
import {socket} from '../Router';
import $ from 'jquery';

class Response extends Component {

    componentDidMount() {
        //this.id = setTimeout(() => this.props.handleTransition(), 3000);
        $('form').submit(function(){
            socket.emit('chat message', $('#m').val(), user);
            $('#m').val('');
        });
    }

    render() {
        return (
            <form action="">
                <input id="response" autoComplete="off"/>
            </form>
        );
    }
}

export default Response;
