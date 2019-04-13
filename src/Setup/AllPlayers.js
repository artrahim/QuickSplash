import React from 'react';
import PlayerSplash from "./PlayerSplash";



export const AllPlayers = ({allPlayers: players}) =>

    <div className=''>
        {
            // Go through the list of players and generate some random x and y pos and display each player.
            players.map((n, i) => {

                let nickname = n.nickname;
                let colour = n.colour;

                let windowWidth = window.innerWidth;

                console.log("width = " + windowWidth);

                let x = 1400;
                let y = 500;

                switch (i+1) {
                    case 1:
                        x = 0.08;
                        y = 0.3;
                        break;
                    case 2:
                        x = 0.8;
                        y = 0.28;
                        break;
                    case 3:
                        x = 0.15;
                        y = 0.7;
                        break;
                    case 4:
                        x = 0.6;
                        y = 0.3;
                        break;
                    case 5:
                        x = 0.4;
                        y = 0.7;
                        break;
                    case 6:
                        x = 0.5;
                        y = 0.5;
                        break;
                    case 7:
                        x = 0.75;
                        y = 0.7;
                        break;
                    case 8:
                        x = 0.3;
                        y = 0.3;
                        break;
                }

                return (
                    <PlayerSplash imagesource={require("../Assets/images/" + colour + ".png")} text={nickname} x={x*window.innerWidth} y={y*window.innerHeight}/>
                )
            })
        }

    </div>;