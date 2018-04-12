import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class ProfileSection extends Component {
    render() {
        return (
            <div className="col-xs-12 col-sm-4">
                <div className="panel panel-border-synapsefi" style={{height: '284px'}}>
                    <div className="panel-header">
                        <h2 className="text-center">Profile</h2><hr />
                    </div>
                    <div className="panel-body">
                        <div className="col-xs-12">
                            <i className="material-icons">account_circle</i>
                            <span className="m-l">User: {this.props.user.name}</span>
                        </div>
                        <div className="col-xs-12">
                            <i className="material-icons">assignment</i>
                            <span className="m-l">Email: {this.props.user.email}</span>
                        </div>
                        <div className="col-xs-12">
                            <i className="material-icons">account_balance</i>
                            <span className="m-l">Bank Account: {this.props.user.accountName}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}