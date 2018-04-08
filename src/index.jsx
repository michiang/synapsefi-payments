import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={App}>
        </Route>
    </Router>,
    document.getElementById('root')
);