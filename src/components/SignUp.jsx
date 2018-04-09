import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';

import { createUser } from '../helpers/user'; 

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            email: '',
            phone: '',
            accountName: ''
        };
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePhoneChange(e) {
        this.setState({ phone: e.target.value });
    }

    handleAccountNameChange(e) {
        this.setState({ accountName: e.target.value });
    }

    handleSubmit() {
        console.log(this.state);
        const user = {
            legal_names: this.state.name,
            password: this.state.password,
            email: this.state.email,
            phone_numbers: this.state.phone,
            accountName: this.state.accountName
        };
        createUser(user);
        this.props.router.push({pathname: '/main', state: this.state});
    }

    render() {
        const handleNameChange = this.handleNameChange.bind(this);
        const handlePasswordChange = this.handlePasswordChange.bind(this);
        const handleEmailChange = this.handleEmailChange.bind(this);
        const handlePhoneChange = this.handlePhoneChange.bind(this);
        const handleAccountNameChange = this.handleAccountNameChange.bind(this);
        const handleSubmit = this.handleSubmit.bind(this);

        return (
            <div>
                <nav className="navbar navbar-default text-color-blue">
                    <div className="text-center m-t m-l">SynapseFI - Payment System</div>
                </nav>
                <h1 className='col-xs-12 text-center'>Sign up for a SynapseFI account!</h1>
                <form>
                    <div className='col-xs-offset-4 col-xs-4'>
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.name}
                                placeholder="Enter your name"
                                onChange={handleNameChange}
                            />
                        </FormGroup>
                    </div>
                    <div className='col-xs-offset-4 col-xs-4'>
                        <FormGroup controlId="formControlsPassword">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                value={this.state.password}
                                placeholder="Enter your password"
                                onChange={handlePasswordChange}
                            />
                        </FormGroup>
                    </div>
                    <div className='col-xs-offset-4 col-xs-4'>
                        <FormGroup controlId="formControlsEmail">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                type="email"
                                value={this.state.email}
                                placeholder="Enter your email"
                                onChange={handleEmailChange}
                            />
                        </FormGroup>
                    </div>
                    <div className='col-xs-offset-4 col-xs-4'>
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Phone Number</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.phone}
                                placeholder="Enter your phone"
                                onChange={handlePhoneChange}
                            />
                        </FormGroup>
                    </div>
                    <div className='col-xs-offset-4 col-xs-4'>
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Bank Account Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.accountName}
                                placeholder="Enter your bank account name"
                                onChange={handleAccountNameChange}
                            />
                        </FormGroup>
                    </div>
                    <div className='text-center col-xs-offset-4 col-xs-4'>
                            <Button onClick={handleSubmit}>Submit</Button>
                    </div>
                </form>
            </div>
        );
    }
}


