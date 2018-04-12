import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class TransactionHistory extends Component {
    renderTransactionHistory() {
        return this.props.transactions.map(transaction => (
            <tr>
                <th>{!transaction.to.user.legal_names[0] ? transaction.to.id : transaction.to.user.legal_names[0]}</th>
                <th>{transaction.to.type}</th>
                <th>{transaction.recent_status.status}</th>
                <th>{transaction.amount.amount} {transaction.amount.currency}</th>
            </tr>
        ));
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-6 max-table-height">
                <div className="panel panel-border-synapsefi panel-table">
                    <div className="panel-heading">
                        <h3 className="panel-title text-center">Transaction History</h3>
                    </div>
                    <div className="panel-body">
                        <table className="table table-striped table-bordered table-list">
                            <thead>
                                <tr>
                                    <th>Sent To</th>
                                    <th>Account Type</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTransactionHistory()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}