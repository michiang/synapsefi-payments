import React, { Component } from 'react';
import Cell from '../components/Cell.jsx'

export default class Row extends React.Component {
    constructor(props) {
        super(props);

        this.state={};
    }

    render() {
        let cells = []
        const y = this.props.y
        for (let x = 0; x < this.props.x; x += 1) {
            cells.push(
                <Cell
                    key={`${x}-${y}`}
                    y={y}
                    x={x}
                    changeCellDataHandler={this.props.changeCellDataHandler}
                    value={this.props.rowData[x] || ''}
                    calculateCellValueHandler={this.props.calculateCellValueHandler}
                    updateCellsHandler={this.props.updateCellsHandler}
                />,
            )
        }
        return (
            <div>
                {cells}
            </div>
        );
    }
};
