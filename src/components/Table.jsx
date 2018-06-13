import React, { Component } from 'react';
import { Parser as FormulaParser } from 'hot-formula-parser'

import Row from '../components/Row.jsx'

export default class Table extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            parser: null
        }
    }

    componentDidMount() {
        const calculateCellValueHandler = this.calculateCellValue.bind(this);

        // Initialize the formula parser on demand
        let parser = new FormulaParser();

        // When a formula contains a cell value, this event lets us
        // hook and return an error value if necessary
        parser.on('callCellValue', (cellCoord, done) => {
            const x = cellCoord.column.index + 1;
            const y = cellCoord.row.index + 1;

            //Out of bounds catch
            if (x > this.props.x || y > this.props.y) {
                throw parser.Error(parser.ERROR_NOT_AVAILABLE);
            }

            if (parser.cell.x === x && parser.cell.y === y) {
                throw parser.Error(parser.ERROR_REF);
            }

            if (!this.state.data[y] || !this.state.data[y][x]) {
                return done('');
            }

            console.log(this.state.data);
            console.log('call cell value: ', this.state.data[y][x]);
            if (this.state.data[y][x].slice(0,1) === '=') {
                console.log(this.state.data[y][x].slice(1));
                return done(this.state.parser.parse(this.state.data[y][x].slice(1)));
            }
            return done(this.state.data[y][x]);
        });

        // Calculating if formula has range of values
        parser.on('callRangeValue', (startCellCoord, endCellCoord, done) => {
            const sx = startCellCoord.column.index + 1
            const sy = startCellCoord.row.index + 1
            const ex = endCellCoord.column.index + 1
            const ey = endCellCoord.row.index + 1
            const fragment = []

            for (let y = sy; y <= ey; y += 1) {
                const row = this.state.data[y];
                if (!row) {
                    continue;
                }

                const colFragment = [];

                for (let x = sx; x <= ex; x += 1) {
                    let value = row[x];
                    if (!value) {
                        value = '';
                    }

                    console.log('value: ', value);
                    if (value.slice(0, 1) === '=') {
                        const res = calculateCellValueHandler({ x, y }, value.slice(1));
                        if (res.error) {
                            throw parser.Error(res.error);
                        }
                        value = res.result;
                    }

                    colFragment.push(value);
                }
                fragment.push(colFragment);
            }

            if (fragment) {
                done(fragment);
            }
        });
        this.setState({parser: parser});
    }

    changeCellData({ x, y }, value) {
        console.log(arguments);
        //Keep track of values in cells with x and y cell coordinates
        const changeData = Object.assign({}, this.state.data)
        if (!changeData[y]) changeData[y] = {}
        changeData[y][x] = value; 
        this.setState({ data: changeData });
    }

    calculateCellValue(cell, value) {
        console.log('calculating value: ', value);
        console.log('calculating cell: ', cell);
        console.log(this.state);
        if (this.state.parser != null) {
            this.state.parser.cell = cell
            console.log('parser: ', this.state.parser);
            let parsed = this.state.parser.parse(value);
            console.log('parsed value: ', parsed);
            if (parsed.error != null) {
                console.log('error: ', parsed.error);
                return parsed;
            }
            if (parsed.result.toString() === '') {
                return parsed;
            }
            if (parsed.result.toString().slice(0, 1) === '=') {
                // formula points to formula
                console.log('recursive call: ', parsed.result.slice(1));
                parsed = calculateCellValue(cell, parsed.result.slice(1));
            }

            return parsed;
        }
    }

    updateCells() {
        this.forceUpdate();
    }

    render() {
        const changeCellDataHandler = this.changeCellData.bind(this);
        const calculateCellValueHandler = this.calculateCellValue.bind(this);
        const updateCellsHandler = this.updateCells.bind(this);

        const rows = [];

        for (let y = 0; y < this.props.y + 1; y++) {
            rows.push(
                <Row
                    key={y}
                    y={y}
                    x={this.props.x + 1}
                    rowData={this.state.data[y] || {}}
                    changeCellDataHandler={changeCellDataHandler}
                    calculateCellValueHandler={calculateCellValueHandler}
                    updateCellsHandler={updateCellsHandler}
                />,
            )
        }
        return (
            <div>
                {rows}
            </div>
        )
    }
}