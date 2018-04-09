import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import ProfileSection from './ProfileSection.jsx';
import UsersList from './UsersList.jsx';
import AccountsList from './AccountsList.jsx';
import TransactionHistory from './TransactionHistory.jsx';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    componentDidMount() {
        this.setState({
            user: this.props.router.location.state
        }, () => {
            console.log('state', this.state);
        });
    }

    render() {
        
        if (this.state.user) {
            return (
                <div>
                    <nav className="navbar navbar-default text-color-blue">
                        <div className="text-center m-t m-l">SynapseFI - Payment System</div>
                    </nav>
                    <ProfileSection user={this.state.user} />
                    <UsersList />
                    <AccountsList />
                    <TransactionHistory />
                </div>
            );
        } else {
            return (
                <div>
                    <nav className="navbar navbar-default text-color-blue">
                        <div className="text-center m-t m-l">SynapseFI - Payment System</div>
                    </nav>
                    <div>Loading...</div>
                </div>
            );
        }
    }
}

