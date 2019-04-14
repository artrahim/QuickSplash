import React, {Component} from 'react';
import {socket, authenticate} from '../Router';

import Cookies from 'universal-cookie';

import {Redirect} from 'react-router-dom'
import {FormError} from "./FormError";

const createjs = window.createjs;
let props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,volume: 0.1})
let props1 = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,volume: 0.5})

const cookies = new Cookies();

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            isLoggedIn: false,
            wrongAuth: false
        };

        this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.login = this.login.bind(this);
        this.playTick = this.playTick.bind(this);
    }

    login() {

        authenticate.authenticate(() => {
            this.setState({isLoggedIn: true});
        });

    }

    loginSubmitHandler(event) {

        event.preventDefault();

        // // For Testing without server.
        // if (this.state.username === "A" && this.state.password === "a")
        //     this.login();

        let self = this;

        let loginInfo = JSON.stringify(this.state);
        console.log(loginInfo);
        // creating cookies
        let temp = JSON.stringify(this.state.username);
        cookies.set('username', temp, { path: '/' });
        socket.emit("login", loginInfo);

        // listen for response
        socket.on('login-success', function (msg) {
            // re-route them to home page
            createjs.Sound.play("splash",props);
            self.login();
            let temp ={
                username: self.state.username,
                auth: true
            };
            temp = JSON.stringify(temp);
            let expTime = 15 * 60;
            console.log("Cookies info in login form:", temp);
            cookies.set('username', temp, { path: '/' , maxAge:expTime});
        });

        socket.on('login-fail', function () {
            console.log("Incorrect user or pass");

            self.setState({wrongAuth: true})

        });

    }

    setUsername(event) {
        this.setState({username: event.target.value});

    }

    setPassword(event) {
        this.setState({password: event.target.value});
    }

    playTick() {
        createjs.Sound.play("tick",props1);
    }


    render() {

        // Set the path we are going to current page, or go back to index
        let {from} = this.props.location.state || {from: {pathname: "/"}};
        let {isLoggedIn} = this.state;

        if (isLoggedIn)
            return <Redirect to={from}/>;

        return (

            <div className="">

                <div className="header">

                    <div className="error">

                        {this.state.wrongAuth ? "Username or password is invalid." : "" }

                    </div>
                    Login

                </div>

                <div className="fieldContainer">

                    <div className="inputContainer">
                        <label htmlFor="username"/>
                        <input className="inputBox" type="text" placeholder="Enter Username"
                               onChange={this.setUsername} onClick={this.playTick} autoComplete="off"/>
                    </div>

                    <div className="inputContainer">
                        <label htmlFor="password"/>
                        <input className="inputBox" type="password" placeholder="Enter Password"
                               onChange={this.setPassword} onClick={this.playTick} autoComplete="off"/>
                    </div>


                    <button className="submitButton" type="button" onClick={this.loginSubmitHandler}>Login</button>

                </div>

            </div>


        );
    }

}

export default LoginForm;
