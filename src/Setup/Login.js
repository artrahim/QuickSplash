import React, {Component} from 'react';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Button from 'react-bootstrap/Button';

import './login.css'
import {Link} from "react-router-dom";
import TransitionLogin from "../Assets/Animations/TransitionLogin";

const createjs = window.createjs;
let props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,volume: 0.1})
let props1 = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,volume: 0.5})

class Login extends Component {

    constructor() {
        super();
        // if 0 then displays login otherwise sign up!!!
        this.state = {
            page: 0,
        };

        this.loginClick = this.loginClick.bind(this);
        this.signUpClick = this.signUpClick.bind(this);
        this.playTick = this.playTick.bind(this);
    }

    loginClick() {
        this.playTick();
        this.setState(state => ({
            page: 0
        }));
    }

    signUpClick() {
        this.playTick();
        this.setState(state => ({
            page: 1
        }));
    }

    playTick() {
        createjs.Sound.play("tick",props1);
    }

    playSplash() {
        createjs.Sound.play("splash",props);
      }

    render() {

        let displayComponent = null;
        switch (this.state.page) {
            case 0:
                displayComponent = <LoginForm location={this.props.location}/>;
                break;
            case 1:
                displayComponent = <SignUpForm/>;
                break;
        }

        return (

            <div className="rootContainer">

                <div className="buttonheader">
                <Link to="/">
                    <Button className="back-button" variant="outline-primary" onClick={this.playSplash}>← Back</Button>
                </Link>
                </div>
                <TransitionLogin className="wrapper">
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

                </TransitionLogin>


            </div>

        );

    }

}

export default Login;
