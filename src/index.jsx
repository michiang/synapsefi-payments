import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignUp from './components/actions/SignUp.jsx';
import Main from './components/actions/Main.jsx';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

export default class Index extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={SignUp} />
                </Route>
                <Route path='main' component={Main} />
            </Router>
        );
    }

}

ReactDOM.render(<Index />, document.getElementById('root'));

