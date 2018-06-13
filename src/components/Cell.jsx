import React, { Component } from 'react';

export default class Cell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            focused: false,
            value: props.value,
            selected: false
        }
        this.cellValues = this.calculateCellValue(
            { x: props.x, y: props.y },
            props.value
        );
    }

    componentWillUpdate() {
        this.cellValues = this.calculateCellValue({ 
            x: this.props.x, 
            y: this.props.y 
        }, this.state.value);   
    }

    onChange(e) {
        this.setState({ value: e.target.value })
        this.cellValues = this.calculateCellValue({ 
            x: this.props.x, 
            y: this.props.y 
        }, e.target.value);
        this.props.updateCellsHandler();
    }

    onKeyPressOnInput(e) {
        if (e.key === 'Enter') {
            this.hasNewValue(e.target.value)
        }
    }

    onKeyPressOnSpan() {
        if (!this.state.focused) {
            this.setState({ focused: true })
        }
    }

    onBlur(e) {
        this.hasNewValue(e.target.value)
    }

    hasNewValue(value) {
        this.props.changeCellDataHandler(
            {
                x: this.props.x,
                y: this.props.y,
            },
            value
        );
        this.setState({ focused: false });
    }

    emitUnselectAllEvent() {
        const unselectAllEvent = new Event('unselectAll');
        window.document.dispatchEvent(unselectAllEvent);
    }

    clicked() {
        this.emitUnselectAllEvent();
        this.setState({ focused: true, selected: true });
    }

    calculateCellValue({ x, y }, value) {
        if (value.slice(0, 1) === '=') {
            console.log('value at cell: ', value);
            const parsedValue = this.props.calculateCellValueHandler({ x, y }, value.slice(1));
            console.log('response: ', parsedValue);
            if (parsedValue.error !== null) {
                return 'INVALID';
            }
            return parsedValue.result;
        }
        return value;
    }

    render() {
        const onKeyPressOnSpanHandler = this.onKeyPressOnSpan.bind(this);
        const onKeyPressOnInputHandler = this.onKeyPressOnInput.bind(this);
        const onBlurHandler = this.onBlur.bind(this);
        const onChangeHandler = this.onChange.bind(this);

        // Display hardcoded first y column
        if (this.props.x === 0) {
            return (
                <span className="rowCol0 cellInput">
                    {this.props.y}
                </span>
            )
        }

        // Display hardcoded floating header of letters
        if (this.props.y === 0) {
            const letters = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
            return (
                <span
                    onKeyPress={onKeyPressOnSpanHandler}
                    className="rowCol0 cellInput"
                    role="presentation">
                    {letters[this.props.x]}
                </span>
            )
        }

        //If cell is focused, 
        if (this.state.focused) {
            return (
                <input
                    className="cellInput"
                    type="text"
                    onBlur={onBlurHandler}
                    onKeyPress={onKeyPressOnInputHandler}
                    value={this.state.value}
                    onChange={onChangeHandler}
                    autoFocus
                />
            )
        }
        return (
            <span
                className="cellInput"
                onClick={e => this.clicked(e)}
                role="presentation"
            >
                {this.cellValues}
            </span>
        )
    }
}