import React, {Component} from "react";

import './test.css';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import Profile from "./Profile";



class ProfileMain extends Component {
  render() {

    return (
        <div>
            <Profile/>
        </div>
    );
}
}

export default ProfileMain;