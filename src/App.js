import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SignUp from './components/SignUp.jsx';
import Main from './components/Main.jsx';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
           view: 'signUp'
        };
    }

    mainChangeHandler() {
        this.setState({view: 'main'});
    }

    render() {
        console.log(this.props);
        return (
            <SignUp router={this.props.router}/>            
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));