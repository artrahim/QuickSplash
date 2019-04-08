import React, {Component} from 'react';
import {socket} from '../Router';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);

    }

    loginSubmitHandler(event) {

        event.preventDefault();

        let loginInfo = JSON.stringify(this.state);
        console.log(loginInfo);
        socket.emit("login", loginInfo);

        // listen for response
        socket.on('success', function (msg) {
            // re-route them to home page

            // set a lgoin flag true


        })

        // if we good re-route to home page otherwise die here!
    }

    setUsername(event) {
        this.setState({username: event.target.value})
    }

    setPassword(event) {
        this.setState({password: event.target.value})
    }

    render() {
        return (

            <div className="">

                <div className="header">Login</div>

                <div className="fieldContainer">

                    <div className="inputContainer">
                        <label htmlFor="username"/>
                        <input className="inputBox" type="text" placeholder="Enter Username"
                               onChange={this.setUsername} autoComplete="off"/>
                    </div>

                    <div className="inputContainer">
                        <label htmlFor="password"/>
                        <input className="inputBox" type="password" placeholder="Enter Password"
                               onChange={this.setPassword} autoComplete="off"/>
                    </div>


                    <button className="submitButton" type="button" onClick={this.loginSubmitHandler}>Login</button>

                </div>

            </div>


        );
    }

}

export default LoginForm;
