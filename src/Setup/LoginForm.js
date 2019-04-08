import React, {Component} from 'react';
import {socket} from '../Router';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
    }

    loginSubmitHandler(event) {

        event.preventDefault();

        this.setState({
            username: event.target.username.value,
            password: event.target.password.value,

        }, () => {

            let loginInfo = JSON.stringify(this.state);
            console.log(loginInfo);
            socket.emit("login", loginInfo);

            // listen for response
            socket.on('success', function (msg) {
                // re-route them to home page
                // set a lgoin flag true


            })

            // if we good re-route to home page otherwise die here!


        });

    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.loginSubmitHandler}>
                        <label>
                            <b>USERNAME:</b>
                            <input type="text" name="username"/>
                        </label>

                        <label>
                            <b>PASSWORD:</b>
                            <input type="text" name="password"/>
                        </label>

                        <input type="submit" value="Submit"/>
                    </form>

                    <p>{"Info: " + this.state.username + "\t" + this.state.password}</p>

                </div>
            </div>

        );
    }

}

export default Login;
