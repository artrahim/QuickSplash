import React, {Component} from "react";

import './test.css';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

import picprofile from './profilepic.jpg';

const createjs = window.createjs;
let props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,volume: 0.1})
let props1 = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,volume: 0.5})

class Profile extends Component {

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

    playTick() {
      createjs.Sound.play("tick",props1);
    }

    playSplash() {
      createjs.Sound.play("splash",props);
    }

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
                        <Button className="back-button" variant="outline-primary" onClick={this.playSplash}>← Back</Button>
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
                      <div className="square-box" id="Stats" onClick={this.playTick}>Player stats</div>
                      <div className="square-box" id="Stats1" onClick={this.playTick}>
                        <div className="items"><p>Total Points:</p><p>{this.props.points}</p></div>
                        <div className="items"><p>Total Games Played:</p><p>{this.props.gameplayed}</p></div>
                        <div className="items"><p>Total Wins:</p><p>{this.props.wins}</p></div>
                      </div>
                      <div className="square-box" id="About" onClick={this.playTick}>About me</div>
                      <div className="square-box" id="About1"onClick={this.playTick}>
                        <div className="items"><p>First Name:</p><p>{this.props.fname}</p></div>
                        <div className="items"><p>Last Name:</p><p>{this.props.lname}</p></div>
                        <div className="items"><p>Username:</p><p>{this.props.username}</p></div>
                        <div className="items"><p>Email:</p><p>{this.props.email}</p></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Middle section */}
                  <div className="column middle" id="B">
                    {/* Profile pic */}
                    <div className="box-inner">
                      <br/>
                      <img src={picprofile} alt="profilepic" id="imageProfile" />
                      <h4 className="username">{this.props.username}</h4>
                    </div>
                  </div>


                  <div className="column side" id="C">
                    <div className="box-outer">
                      <div className="square-box" id="Achievements" onClick={this.playTick} >Achievements</div>
                      <div className="square-box" id="Achievements1" onClick={this.playTick} >
                        <div className="items"><p>Win a game:</p><p>n/a</p></div>
                        <div className="items"><p>Win game with 5000pts:</p><p>n/a</p></div>
                        <div className="items"><p>Play 2 games:</p><p>n/a</p></div>
                      </div>
                      <div className="square-box" id="Recent" onClick={this.playTick} >Recent Activity</div>
                      <div className="square-box" id="Recent1" onClick={this.playTick}>
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

export default Profile
