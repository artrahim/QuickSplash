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
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setEmail = this.setEmail.bind(this);
    }

    signUpSubmitHandler(event) {

        event.preventDefault();

        let loginInfo = JSON.stringify(this.state);
        console.log(loginInfo);
        socket.emit("signUp", loginInfo);
    }

    setUsername(event) {
        this.setState({username: event.target.value})
    }

    setPassword(event) {
        this.setState({password: event.target.value})
    }

    setEmail(event) {
        this.setState({email: event.target.value})
    }

    setFirstName(event) {
        this.setState({fname: event.target.value})
    }

    setLastName(event) {
        this.setState({lname: event.target.value})
    }


    render() {
        return (

            <div className="">

                <div className="header">Sign Up</div>

                <div className="fieldContainer">

                    <div className="inputContainer">
                        <label htmlFor="fname"/>
                        <input className="inputBox" type="text" placeholder="First Name"
                               onChange={this.setFirstName} autoComplete="off"/>
                    </div>

                    <div className="inputContainer">
                        <label htmlFor="lname"/>
                        <input className="inputBox" type="text" placeholder="Last Name"
                               onChange={this.setLastName} autoComplete="off"/>
                    </div>

                    <div className="inputContainer">
                        <label htmlFor="email"/>
                        <input className="inputBox" type="text" placeholder="Email"
                               onChange={this.setEmail} autoComplete="off"/>
                    </div>

                    <div className="inputContainer">
                        <label htmlFor="username"/>
                        <input className="inputBox" type="text" placeholder="Username"
                               onChange={this.setUsername} autoComplete="off"/>
                    </div>

                    <div className="inputContainer">
                        <label htmlFor="password"/>
                        <input className="inputBox" type="password" placeholder="Password"
                               onChange={this.setPassword} autoComplete="off"/>
                    </div>

                    <button className="submitButton" type="button" onClick={this.signUpSubmitHandler}>Sign Up</button>

                </div>

            </div>


        );

    }

}

export default SignUpForm;


/*
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
 */