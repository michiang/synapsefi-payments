import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Promise from 'promise';

import { Button, FormGroup, ControlLabel, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';

export default class PaySection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            selectedReceiver: '',
            title: ''
        };
    }

    handleAmountChange(e) {
        this.setState({ 
            amount: e.target.value 
        });
    }

    handleTitleChange(e) {
        const userId = e;
        const context = this;
        this.props.allUsers.forEach(function(user) {
            if (user.id === userId) {
                context.setState({
                    title: user.name
                });
            }
        })
    }

    selectReceiver(selectedReceiver) {
        const context = this;
        this.setState({
            selectedReceiver: selectedReceiver
        });
        this.props.updateSelectedReceiver(selectedReceiver);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createTransaction(this.state.amount);
        this.setState({ 
            amount: '' 
        });
    }

    handleAddACH() {
        axios.post('/api/nodes/create_ACH_US_Node', this.props.selectedSender).then((users) => {
            console.log(users.data);
            this.props.updateSenderNode(users.data);
        });
    }

    handleSwitchAccount() {
        this.props.switchAccount();
    }

    render() {
        const selectReceiver = this.selectReceiver.bind(this);
        const handleAmountChange = this.handleAmountChange.bind(this);
        const handleSubmit = this.handleSubmit.bind(this);
        const handleTitleChange = this.handleTitleChange.bind(this);
        const handleAddACH = this.handleAddACH.bind(this);
        const handleSwitchAccount = this.handleSwitchAccount.bind(this);

        return (
            <div>
                <div className="col-xs-12 col-sm-8">
                    <div className="panel panel-border-synapsefi">
                        <div className="panel-header">
                            <h2 className="text-center">Send Money</h2><hr />
                        </div>
                        <div className="panel-body">
                            <div className="col-xs-12">
                                <div className="col-xs-12 text-center m-b">
                                    <div className="col-xs-12 col-sm-6">
                                        <Button onClick={handleAddACH} className="color-button-synapsefi">Switch to ACH US Node</Button>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Button onClick={handleSwitchAccount} className="color-button-synapsefi">Switch to Original Account</Button>
                                    </div>
                                </div>
                                <div className="col-xs-6">
                                    <p className="text-center">Balance: {this.props.senderNode.json.info.balance.amount} {this.props.senderNode.json.info.balance.currency}</p>
                                    <p className="text-center">From: {this.props.senderNode.json.info.nickname}</p>
                                </div>
                                <div className="col-xs-6">
                                    <p className="text-center">
                                    <span className="m-r">To:</span>
                                    <DropdownButton onSelect={handleTitleChange} title={ this.state.title } >
                                            {
                                                this.props.allUsers.map(user => (
                                                    <MenuItem eventKey={user.id} onSelect={selectReceiver}>{user.name}</MenuItem>
                                                ))
                                            }
                                    </DropdownButton></p>
                                </div>
                            </div>
                            <div className="col-xs-12 m-t">
                                <FormGroup controlId="formBasicText">
                                    <div className="col-xs-12 col-sm-10">
                                        <FormControl
                                            type="number"
                                            value={this.state.amount}
                                            placeholder="Enter the amount you want to send"
                                            onChange={handleAmountChange}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-sm-2">
                                        <Button onClick={handleSubmit} className="color-button-synapsefi" disabled={this.props.sendDisabled}>Send</Button>
                                    </div>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}