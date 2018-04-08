import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>Hello</div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));