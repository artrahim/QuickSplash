import React, {Component} from "react";
import './results.css';
import Logo from "../../Game/Utilities/Logo";
import Winner from './Winner';
import Others from './Others';


import i from '../../Assets/images/redSplash.png';
import j from '../../Assets/images/blueSplash.png';
import face from '../../Assets/images/simley.png';
import face1 from '../../Assets/images/scared.png';



// Props: splash1, splash2, splash3, face1, face2, face3, Username1, Username2 and Username3

class Results extends Component {
    render() {
        return (
            <div>
                <Logo/>
                <div id="Players">
                    <Winner splash1={j} Face1={face1} Username1="Supahotfire"/>
                    <Others splash2={i} splash3={j} Face2={face} Face3={face1} Username2="Avenger" Username3="TOnyStark"/> 
                </div>
            </div>
        );
    }
}

export default Results