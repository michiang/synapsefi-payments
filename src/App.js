import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SignUp from './components/actions/SignUp.jsx';

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
        return (
            <SignUp router={this.props.router}/>            
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));