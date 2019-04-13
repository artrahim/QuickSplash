import React, {Component} from "react";
import './results.css';

import Logo from "../../Game/Utilities/Logo";

import Results from './Results';

// SPLASH COLORS
// import redSplash from '../../Assets/images/redSplash.png';
// import blueSplash from '../../Assets/images/blueSplash.png';
// import orangeSplash from '../../Assets/images/orangeSplash.png';
import pinkSplash from '../../Assets/images/pinkSplash.png';


//FACES
import simley from '../../Assets/images/simley.png';
import scared from '../../Assets/images/scared.png';
import Winner from "./Winner";
import Others from "./Others";


// Props: splash1, splash2, splash3, face1, face2, face3, Username1, Username2 and Username3

class Resultmain extends Component {
    render() {
        return (
            <div>
                <Logo/>
                <Results>

                    <div id="Players">
                        <Winner splash1={this.props.first}/>
                        <Others splash2={this.props.second} splash3={this.props.third}/>
                    </div>

                </Results>
                {/*// Face1={simley}*/}
                {/*// Face2={scared}*/}
                {/*// Face3={scared}*/}
                {/*// Username1={this.props.first.nickname}*/}
                {/*// Username2={this.props.second.nickname}*/}
                {/*// Username3={this.props.third.nickname}/>*/}
            </div>
        );
    }
}

export default Resultmain
