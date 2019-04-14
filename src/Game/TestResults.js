import React, {Component} from 'react';
import ResultMain from "./results/ResultMain";

class TestResults extends Component {


    render() {

        return (

            <div className="">

                <ResultMain top={[{nickname: 'A', colour: "greenSplashPlayer", score: 300}, {
                    nickname: 'B',
                    colour: "redSplashPlayer",
                    score: 200
                }, {nickname: 'C', colour: "pinkSplashPlayer", score: 100}]}/>

            </div>

        );

    }

}

export default TestResults;
