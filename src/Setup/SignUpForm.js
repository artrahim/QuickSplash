import React, {Component} from 'react';
import {socket} from '../Router';

import {FormError} from './FormError';

const createjs = window.createjs;
let props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,volume: 0.1})
let props1 = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,volume: 0.5})


class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            username: "",
            password: "",
            validForm: false,
            emailValid: false,
            usernameValid: false,
            passwordValid: false,
            fnameValid: false,
            lnameValid: false,
            formError: {
                email: '',
                username: '',
                password: '',
                name: ''
            },
        };

        this.signUpSubmitHandler = this.signUpSubmitHandler.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.checkField = this.checkField.bind(this);
        this.playTick = this.playTick.bind(this);
    }

    checkAllFields(){

        let object = this.state.formError;

        for (let property in object) {
            if (object.hasOwnProperty(property)) {

                console.log("Property = " + property);

                // this.checkField(property, this.state.);
            }
        }
    }


    checkField(fieldName, value) {

        let fieldErrors = this.state.formError;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let fnameValid = this.state.fnameValid;
        let lnameValid = this.state.lnameValid;
        let usernameValid = this.state.usernameValid;
        let passLength = 5;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                console.log("Email is valid: " + emailValid)
                fieldErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= passLength;
                fieldErrors.password = passwordValid ? '' : ' must be greater than ' + passLength + ' characters';
                break;
            case 'fname':
                fnameValid = value.length >= 1;
                fieldErrors.name = fnameValid ? '' : ' not given';
                break;
            case 'lname':
                lnameValid = value.length >= 1;
                fieldErrors.name = lnameValid ? '' : ' not given';
                break;
            case 'username':
                usernameValid = value.length >= 1;
                fieldErrors.username = usernameValid ? '' : ' cannot be blank';
                break;

            default:
                break;
        }

        this.setState({
            formErrors: fieldErrors,
            emailValid: emailValid,
            fnameValid: fnameValid,
            lnameValid: lnameValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {

        console.log("email " + this.state.emailValid)
        console.log("pass = " + this.state.passwordValid)
        console.log("first name = " + this.state.fnameValid)
        console.log("last name = " + this.state.lnameValid)

        this.setState({
            validForm: this.state.emailValid && this.state.usernameValid && this.state.passwordValid && this.state.fnameValid && this.state.lnameValid
        });
    }


    signUpSubmitHandler(event) {

        event.preventDefault();

        this.checkAllFields();

        let self = this;

        let loginInfo = JSON.stringify(this.state);

        if (this.state.emailValid && this.state.passwordValid && this.state.fnameValid && this.state.lnameValid)
            socket.emit("signUp", loginInfo);

        socket.on('signUp-success', function () {
            createjs.Sound.play("splash",props);
            self.setState({
                formErrors: "",
                usernameValid: true,
            }, self.validateForm);


            self.render();
        });


        socket.on("signUp-fail", function () {
            let fieldErrors = self.state.formError;
            fieldErrors.username = ' is already taken.';

            self.setState({
                formErrors: fieldErrors
            }, self.validateForm);
        })


    }

    setUsername(event) {
        this.setState({username: event.target.value}, ()=>{
            this.checkField("username", this.state.username)
        })
    }

    setPassword(event) {
        this.setState({password: event.target.value}, () => {
            this.checkField("password", this.state.password);
        })
    }

    setEmail(event) {
        this.setState({email: event.target.value}, () => {
            this.checkField("email", this.state.email);
        })
    }

    setFirstName(event) {
        this.setState({fname: event.target.value}, () => {
            this.checkField("fname", this.state.fname);
        })
    }

    setLastName(event) {
        this.setState({lname: event.target.value}, () => {
            this.checkField("lname", this.state.lname);
        })
    }

    playTick() {
        createjs.Sound.play("tick",props1);
    }

    render() {

        if (this.state.validForm)
            return (
                <div className="complete">
                    <p>Sign up complete. You can now login with your username and password.</p>
                </div>
            );

        return (

            <div className="signUpContainer">

                <div className="error">

                    <FormError formError={this.state.formError}/>

                </div>

                <div className="header">Sign Up</div>

                <div className="fieldContainer signUpFieldContainer">

                    <div className="inputContainer">
                        <label htmlFor="fname"/>
                        <input className="inputBox" type="text" placeholder="First Name"
                               onChange={this.setFirstName} onClick={this.playTick} autoComplete="off"/>
                    </div>

                    <div className="inputContainer">
                        <label htmlFor="lname"/>
                        <input className="inputBox" type="text" placeholder="Last Name"
                               onChange={this.setLastName} onClick={this.playTick} autoComplete="off"/>
                    </div>

                    <div className="inputContainer">
                        <label htmlFor="email"/>
                        <input className="inputBox" type="text" placeholder="Email"
                               onChange={this.setEmail} onClick={this.playTick} autoComplete="off"/>
                    </div>

                    <div className="inputContainer">
                        <label htmlFor="username"/>
                        <input className="inputBox" type="text" placeholder="Username"
                               onChange={this.setUsername} onClick={this.playTick} autoComplete="off"/>
                    </div>

                    <div className="inputContainer">
                        <label htmlFor="password"/>
                        <input className="inputBox" type="password" placeholder="Password"
                               onChange={this.setPassword} onClick={this.playTick} autoComplete="off"/>
                    </div>

                    <button className="submitButton" type="button" onClick={this.signUpSubmitHandler}>Sign Up</button>

                </div>

            </div>


        );

    }

}

export default SignUpForm;