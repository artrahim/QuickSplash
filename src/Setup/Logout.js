import React, {Component} from 'react';
import {Link, NavLink, Redirect} from 'react-router-dom';
import {authenticate} from "../Router";

import './login.css'
import Button from "react-bootstrap/Button";

const createjs = window.createjs;
let props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,volume: 0.1})
let props1 = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,volume: 0.5})

class Logout extends Component {

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
        createjs.Sound.play("tick",props1);
        this.setState(state => ({
            page: 0
        }));
    }

    signUpClick() {
        createjs.Sound.play("splash",props);
        this.setState(state => ({
            page: 1
        }));
    }

    componentDidMount() {
        authenticate.logout();
    }


    render() {

        return (

            <div className="rootContainer">
                <div className="wrapper">
                    <div className="pageSelectorContainer">

                        <div className={"pageSelector " + (this.state.page === 0 ? "currentlySelected" : "")}
                             onClick={this.loginClick}>
                            <NavLink className='' to={'/login'}>Login</NavLink>
                        </div>

                        <div className={"pageSelector " + (this.state.page === 1 ? "currentlySelected" : "")}
                             onClick={this.signUpClick}>
                            <NavLink className='' to={'/'}>Home</NavLink>
                        </div>

                    </div>

                    <div className="loggedOut">
                        <p>You have successfully logged out</p>
                    </div>

                </div>
            </div>

        );


        //
        // let component =
        //     <Redirect to={{
        //         pathname: '/',
        //     }}/>;
        //
        // return (
        //     <div>
        //         {component}
        //     </div>
        // );

    }

}

export default Logout;