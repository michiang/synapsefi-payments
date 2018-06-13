import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table.jsx';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        //x and y determine the number of rows and columns, respectively
        return (
            <div style={{ width: 'max-content' }}>
                <Table x={10} y={10} />
            </div>        
        );
    }
}

ReactDOM.render(<App />,document.getElementById('root'));
