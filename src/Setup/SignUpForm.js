import React, {Component} from 'react';
import {socket} from '../Router';


class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            username: "",
            password: ""
        };

        this.signUpSubmitHandler = this.signUpSubmitHandler.bind(this);
    }

    signUpSubmitHandler(event) {

        event.preventDefault();


        this.setState({
            username: event.target.username.value,
            password: event.target.password.value,
            fname: event.target.fname.value,
            lname: event.target.lname.value,
            email: event.target.email.value

        }, () => {

            let loginInfo = JSON.stringify(this.state);
            console.log(loginInfo);
            socket.emit("signUp", loginInfo);
        });

    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.signUpSubmitHandler}>
                        <label>
                            <b>First Name:</b>
                            <input type="text" name="fname"/>
                        </label>
                        <label>
                            <b>Last Name:</b>
                            <input type="text" name="lname"/>
                        </label>
                        <label>
                            <b>Email:</b>
                            <input type="text" name="email"/>
                        </label>
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

export default SignUpForm;
