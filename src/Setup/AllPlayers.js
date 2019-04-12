import React from 'react';
import PlayerSplash from "./PlayerSplash";

export const AllPlayers = ({allPlayers: players}) =>

    <div className=''>
        {
            // Go through the list of players and generate some random x and y pos and display each player.
            players.map((n, i) => {

                let nickname = n.nickname;
                let colour = n.colour;

                let x = 1400;
                let y = 500;

                switch (i+1) {
                    case 1:
                        x = 100;
                        y = 200;
                        break;
                    case 2:
                        x = 1300;
                        y = 300;
                        break;
                    case 3:
                        x = 200;
                        y = 700;
                        break;
                    case 4:
                        x = 700;
                        y = 600;
                        break;
                    case 5:
                        x = 1500;
                        y = 700;
                        break;
                    case 6:
                        x = 1000;
                        y = 500;
                        break;
                    case 7:
                        x = 450;
                        y = 400;
                        break;
                    case 8:
                        x = 1100;
                        y = 700;
                        break;
                }

                return (
                    <PlayerSplash imagesource={require("../Assets/images/" + colour + ".png")} text={nickname} x={x} y={y}/>
                )
            })
        }

    </div>;