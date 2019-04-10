import React, {Component} from 'react'
import logo from '../../Assets/images/logo.png';
import {Link} from "react-router-dom";

class Logo extends Component {
    render() {
        return (
            <span className="center">
                <Link to="/">
                    <img id="logo" src={logo} alt="Logo"/>
                </Link>
             </span>
        );
    }
}

export default Logo;
