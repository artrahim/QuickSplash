import React, {Component} from 'react'
import logo from '../../Assets/images/logo.png';
import {Link} from "react-router-dom";

import '../Logo.css'

class Logo extends Component {
    render() {
        return (
            <div id="logo-div">
                <div className="center">
                    <Link to="/">
                        <img id="logo" src={logo} alt="Logo"/>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Logo;
