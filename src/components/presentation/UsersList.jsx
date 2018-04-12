import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class UsersList extends Component {
    renderUsers() {
        return this.props.allUsers.map(user => (
            <tr>
                <th>{user.name}</th>
                <th>{user.email}</th>
                <th>{user.phone_number}</th>
            </tr>
        ));
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-6 max-table-height">
                <div className="panel panel-border-synapsefi panel-table">
                    <div className="panel-heading">
                        <h3 className="panel-title text-center">Users</h3>
                    </div>
                    <div className="panel-body">
                        <table className="table table-striped table-bordered table-list">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderUsers()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}