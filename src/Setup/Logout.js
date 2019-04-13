import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {authenticate} from "../Router";

import './login.css'
import Button from "react-bootstrap/Button";


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
        this.setState(state => ({
            page: 0
        }));
    }

    signUpClick() {
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

                <Link to="/">
                    <Button className="back-button" variant="outline-primary" onMouseOver={this.playTick}>←
                        Back</Button>
                </Link>
                <div className="wrapper">
                    <div className="pageSelectorContainer">

                        <div className={"pageSelector " + (this.state.page === 0 ? "currentlySelected" : "")}
                             onClick={this.loginClick}>
                            Login
                        </div>

                        <div className={"pageSelector " + (this.state.page === 1 ? "currentlySelected" : "")}
                             onClick={this.signUpClick}>
                            Home
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