import React from 'react';
import PlayerSplash from "./PlayerSplash";


export const AllPlayers = ({allPlayers: players, splashColour: splash}) =>

    <div className=''>
        {
            // Go through the list of players and generate some random x and y pos and display each player.
            players.map((n) => {
                let x = Math.floor(Math.random() * 500) + 300;  // Starting at 300, 500 = the number of possible options. [300,800]
                let y = Math.floor(Math.random() * 400) + 300;  // [300,800]

                console.log('colour for ' + n + ' is ' + splash + ' and pos x and y is ' + x + ' ' + y);

                return (
                    <PlayerSplash imagesource={require("../Assets/images/" + splash + ".png")} text={n} x={x} y={y}/>
                )
            })
        }

    </div>;