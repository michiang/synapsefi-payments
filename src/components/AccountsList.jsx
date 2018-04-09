import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default class AccountsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log('mounted');
    }

    render() {
        return (
            <div>
                AccountsList
            </div>
        );
    }
}