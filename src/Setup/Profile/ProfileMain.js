import React, {Component} from "react";

import './test.css';

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

    backButton() {
        window.history.back();
    }

    navbar() {
        /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
        document.getElementById("myDropdown").classList.toggle("show");

        // Close the dropdown if the user clicks outside of it
        window.onclick = function(e) {
            if (!e.target.matches('.dropbtn')) {
                var myDropdown = document.getElementById("myDropdown");
                if (myDropdown.classList.contains('show')) {
                    myDropdown.classList.remove('show');
                }
            }
        }
    }



    render() {
        return (
            <div>
              <title>Profile Page</title>
              
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
              <link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet" />

              <div className="box">
                {/* Header contents */}
                <div className="row header">
                  <div className="header-box">
                    <button className="backButton" onClick={this.backButton}>Home Page</button>
                    <div className="center"><h2>Profile Page</h2></div>
                  </div>
                  <h4 className="username">USERNAME</h4>
                  <div className="circle" />
                  <ul className="level">
                    <li className="lvl-box">rookie</li>
                    <li className="lvl-box"><meter value="0.6" /></li>
                  </ul>
                  <br/><br/>
                  <div className="online">LastONline</div>
                  <br /><br />
                </div>

                {/* User profile contents */}
                <div className="row content">
                  <div className="column side" id="A">
                    <div className="box-outer">
                      <div className="square-box" id="Stats">Player stats</div>
                      <div className="square-box" id="Stats1">
                        <div className="items"><p>Total points:</p><p>1000iuninuinuuinuinuiniunuin</p></div>
                        <div className="items"><p>Total games played:</p><p>111</p></div>
                        <div className="items"><p>Total Hrs played:</p><p>2000</p></div>
                        <div className="items"><p>Best response time:</p><p>3 seconds</p></div>
                      </div>
                      <div className="square-box" id="About">About me</div>
                      <div className="square-box" id="About1">
                        <div className="items"><p>First Name:</p><p>Niro</p></div>
                        <div className="items"><p>Last Name:</p><p>DJ</p></div>
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
                    {/* 5 star rating */}
                    <br/>
                    <div>
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star" />
                      <span className="fa fa-star" />
                    </div>
                    {/* Edit profile nav bar */}
                    <div className="navbar">
                      <div className="dropdown">
                        <button className="dropbtn" onClick={this.navbar}>Edit profile
                          <i className="fa fa-caret-down" />
                        </button>
                        <div className="dropdown-content" id="myDropdown">
                          <a href="#">Username</a>
                          <a href="#">Password</a>
                          <a href="#">Profile Picture</a>
                          <a href="#">Update Bio</a>
                          <a href="#">Log Out</a>
                        </div>
                      </div> 
                    </div>
                    </div>
                  </div>
                  <div className="column side" id="C">
                    <div className="box-outer">
                      <div className="square-box" id="Achievements">Achievements</div>
                      <div className="square-box" id="Achievements1">
                        <div className="items"><p>Total games:</p><p>1000</p></div>
                        <div className="items"><p>Total wins:</p><p>999</p></div>
                        <div className="items"><p>Highest win score:</p><p>15000</p></div>
                        <div className="items"><p>First win or loss:</p><p /></div>
                        <div className="items"><p>Reach lvl:</p><p>rookie</p></div>	
                      </div>
                      <div className="square-box" id="Recent">Recent Activity</div>
                      <div className="square-box" id="Recent1">
                        <div className="items"><p>Recent Game history:</p><p>n/a</p></div>
                        <div className="items"><p>Players recently played with:</p><p>n/a</p></div>
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