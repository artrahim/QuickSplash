import React, {Component} from "react";
import './results.css';

import Logo from "../../Game/Utilities/Logo";

import Results from './Results';

// SPLASH COLORS
import redSplash from '../../Assets/images/redSplash.png';
import blueSplash from '../../Assets/images/blueSplash.png';
import orangeSplash from  '../../Assets/images/orangeSplash.png';
import pinkSplash from '../../Assets/images/pinkSplash.png';


//FACES
import simley from '../../Assets/images/simley.png';
import scared from '../../Assets/images/scared.png';


// Props: splash1, splash2, splash3, face1, face2, face3, Username1, Username2 and Username3

class Resultmain extends Component {
    render() {
        return (
            <div>
                <Logo/>
                <Results
                splash1={redSplash}
                splash2={blueSplash}
                splash3={orangeSplash}
                Face1={simley}
                Face2={scared}
                Face3={scared}
                Username1="Supahotfire"
                Username2="Tony Stark"
                Username3="DjKhaled"/>
            </div>
        );
    }
}

export default Resultmain
