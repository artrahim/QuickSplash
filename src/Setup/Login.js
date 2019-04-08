import React, {Component} from 'react';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Waiting from "../Game/Waiting";
import RoundTransitions from "../Game/RoundTransitions";


class Login extends Component {

    constructor() {
        super();
        // if 0 then displays login otherwise sign up!!!
        this.state = {
            page: 0
        };

        this.clickHandler = this.clickHandler.bind(this);

    }

    clickHandler() {
        let newState = (this.state.page + 1 )% 2;
         console.log(newState);
        this.setState(state => ({
            page: (state.page += 1) % 2
        }));
    }


    render() {

        let displayComponent = null;
        switch (this.state.page) {
            case 0:
                displayComponent = <LoginForm/>;
                break;
            case 1:
                displayComponent = <SignUpForm/>;
                break;
        }

        return (
            <div>
                // something to switch
                <button onClick={this.clickHandler}>Login</button>
                <button onClick={this.clickHandler}>Sign Up</button>
                {displayComponent}
            </div>

        );

    }

}

export default Login;
