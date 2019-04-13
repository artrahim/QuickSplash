import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {authenticate} from "../Router";


class Logout extends Component {


    componentDidMount() {
        authenticate.logout();
    }


    render() {

        let component =
            <Redirect to={{
                pathname: '/',
            }}/>;

        return (
            <div>
                {component}
            </div>
        );

    }

}

export default Logout;