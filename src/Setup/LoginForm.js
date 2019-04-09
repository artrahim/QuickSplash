import React, {Component} from 'react';
import {socket, authenticate} from '../Router';

import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            username: "",
            password: "",
            isLoggedIn: false
        };

        this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.login = this.login.bind(this);

    }

    login() {

        authenticate.authenticate(() => {
            this.setState({isLoggedIn: true});
        });

    }


    loginSubmitHandler(event) {

        event.preventDefault();

        // For Testing without server.
        if (this.state.username === "A" && this.state.password === "a")
            this.login();


        let loginInfo = JSON.stringify(this.state);
        console.log(loginInfo);
        socket.emit("login", loginInfo);

        // listen for response
        socket.on('success', function (msg) {

            // re-route them to home page
           this.login();


        })

    }

    setUsername(event) {
        this.setState({username: event.target.value})
    }

    setPassword(event) {
        this.setState({password: event.target.value})
    }

    render() {

        // Set the path we are going to current page, or go back to index
        let {from} = {from: {pathname: "/"}};
        let {isLoggedIn} = this.state;


        if (isLoggedIn)
            return <Redirect to={from}/>;

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
