import React, {Component} from "react";

import './test.css';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

import picprofile from './profilepic.jpg';



class ProfileMain extends Component {

    componentDidMount() {

        let A = document.getElementById('A');
        let B = document.getElementById('B');
        function order(x) {
            if (x.matches) { // If media query matches
                 B.after(A);
            } else {
                A.after(B);
            }
        }
        let x = window.matchMedia("(max-width: 599px)");
        order(x) // Call listener function at run time
        x.addListener(order) // Attach listener function on state changes

        /////////////////////////////////////////////

        function hiddenSwap(A,B){
            document.getElementById(A).onclick = function() {
                document.getElementById(A).style.display = "none";
                document.getElementById(B).style.display = "inline-block"; 
            } 
        }
        hiddenSwap("Stats","Stats1");
        hiddenSwap("Stats1","Stats");
        hiddenSwap("About","About1");
        hiddenSwap("About1","About");
        hiddenSwap("Achievements","Achievements1");
        hiddenSwap("Achievements1","Achievements");
        hiddenSwap("Recent","Recent1");
        hiddenSwap("Recent1","Recent");
     }

    // backButton() {
    //     window.history.back();
    // }

    render() {
        return (
            <div id="profilePage">
              <title>Profile Page</title>
              
              
              <link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet" />

              <div className="box">
                {/* Header contents */}
                <div className="row header">
                  <div className="header-box">
                    <div className="backProfile">
                      <Link to="/">
                        <Button className="back-button" variant="outline-primary" onClick={this.playSplash} onMouseOver={this.playTick}>← Back</Button>
                      </Link>
                    </div>
                      {/* <button className="backButton" onClick={this.backButton}>Home Page</button> */}
                    <h1 id="profilesign">Profile Page</h1>
                  </div>
                </div>

                {/* User profile contents */}
                <div className="row content">
                  <div className="column side" id="A">
                    <div className="box-outer">
                      <div className="square-box" id="Stats">Player stats</div>
                      <div className="square-box" id="Stats1">
                        <div className="items"><p>Total Points:</p><p>1000</p></div>
                        <div className="items"><p>Total Games Played:</p><p>111</p></div>
                        <div className="items"><p>Total Wins:</p><p>20</p></div>
                      </div>
                      <div className="square-box" id="About">About me</div>
                      <div className="square-box" id="About1">
                        <div className="items"><p>First Name:</p><p>Niro</p></div>
                        <div className="items"><p>Last Name:</p><p>DJ</p></div>
                        <div className="items"><p>Username:</p><p>DJ</p></div>
                        <div className="items"><p>Email:</p><p>Niro</p></div>
                        <div className="items"><p>Gender:</p><p>Male</p></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Middle section */}
                  <div className="column middle" id="B">
                    {/* Profile pic */}
                    <div className="box-inner">
                      <br/>
                      <img src={picprofile} alt="profilepic" id="imageProfile" />
                      <h4 className="username">USERNAME</h4>
                    </div>
                  </div>


                  <div className="column side" id="C">
                    <div className="box-outer">
                      <div className="square-box" id="Achievements">Achievements</div>
                      <div className="square-box" id="Achievements1">
                        <div className="items"><p>Win a game:</p><p>n/a</p></div>
                        <div className="items"><p>Win game with 5000pts:</p><p>n/a</p></div>
                        <div className="items"><p>Play 2 games:</p><p>n/a</p></div>
                      </div>
                      <div className="square-box" id="Recent">Recent Activity</div>
                      <div className="square-box" id="Recent1">
                        <div className="items"><p>Last game position:</p><p>n/a</p></div>
                        <div className="items"><p>Last game pts:</p><p>n/a</p></div>
                        <div className="items"><p>Most recent achievements:</p><p>n/a</p></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* css height purpose */}
                <div className="row footer" />
              </div >  
            </div >
        );
    }
}

export default ProfileMain;