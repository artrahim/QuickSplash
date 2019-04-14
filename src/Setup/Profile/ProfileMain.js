import React, {Component} from "react";
import {socket} from '../../Router';

import './test.css';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import Profile from "./Profile";
import Cookies from "universal-cookie";


const cookies = new Cookies();

class ProfileMain extends Component {

    constructor()
    {
        super();

        this.state = {
            uname: "",
            fname: "",
            lname: '',
            email: '',
            wins: null,
            gameplayed: null,
            points: null
        };
    }

    componentWillMount()
    {
        let self = this;

        // emit a socket event to ask for account details
        let uname = cookies.get('username').username;
        socket.emit('profile', uname);

        socket.on('profileInfo', function(info)
        {
            console.log("the player info " + info.uname + " fname is "+ info.fname);

            self.setState(
                {
                    uname: info.uname,
                    fname: info.fname,
                    lname: info.lname,
                    email: info.email,
                    wins: info.wins,
                    gameplayed: info.gameplayed,
                    points: info.points
                }
            );

        });


    }

    render() {
        return (
            <div>
                <Profile username={this.state.uname} fname={this.state.fname} 
                lname={this.state.lname} email={this.state.email} wins={this.state.wins}
                gameplayed={this.state.gameplayed} points={this.state.points}/>
            </div>
        );
    }
}

export default ProfileMain;