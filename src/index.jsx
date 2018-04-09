import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignUp from './components/SignUp.jsx';
import Main from './components/Main.jsx';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };
    }

    renderMain() {
        return (
            <SignUp user={this.state.user}/>
        );
    }

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
// ReactDOM.render(
//     <Router history={hashHistory}>
//         <Route path='/' component={App}>
//             <IndexRoute component={SignUp} />
//         </Route>
//         <Route path='main' component={Main} />
//     </Router>,
//     document.getElementById('root')
// );
