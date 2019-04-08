import React, {Component} from 'react';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

import './login.css'

class Login extends Component {

    constructor() {
        super();
        // if 0 then displays login otherwise sign up!!!
        this.state = {
            page: 0
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
            <div>
                // something to switch
                <button onClick={this.loginClick}>Login</button>
                <button onClick={this.signUpClick}>Sign Up</button>
                {displayComponent}
            </div>

        );

    }

}

export default Login;
