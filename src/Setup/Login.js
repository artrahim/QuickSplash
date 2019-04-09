import React, {Component} from 'react';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Button from 'react-bootstrap/Button';

import './login.css'
import Logo from "./CreateLobby";


class Login extends Component {

    constructor() {
        super();
        // if 0 then displays login otherwise sign up!!!
        this.state = {
            page: 0,
        };

        this.loginClick = this.loginClick.bind(this);
        this.signUpClick = this.signUpClick.bind(this);
    }

    loginClick() {
        this.setState(state => ({
            page: 0
        }));
    }

    signUpClick() {
        this.setState(state => ({
            page: 1
        }));
    }

    render() {

        let displayComponent = null;
        switch (this.state.page) {
            case 0:
                displayComponent = <LoginForm/>;
                break;
            case 1:
                displayComponent = <SignUpForm/>;
                break;
        }

        return (

            <div className="rootContainer">

                <Button className ="back-button" variant="outline-primary"  href={"/"}>← Back</Button>
                <div className="wrapper">
                    <div className="pageSelectorContainer">

                        <div className={"pageSelector " + (this.state.page === 0 ? "currentlySelected" : "")}
                             onClick={this.loginClick}>
                            Login
                        </div>

                        <div className={"pageSelector " + (this.state.page === 1 ? "currentlySelected" : "")}
                             onClick={this.signUpClick}>
                            Sign Up
                        </div>

                    </div>

                    <div className="formContainer">
                        {displayComponent}
                    </div>

                </div>


            </div>

        );

    }

}

export default Login;
