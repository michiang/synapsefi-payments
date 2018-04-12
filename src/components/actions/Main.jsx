import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import ProfileSection from '../presentation/ProfileSection.jsx';
import UsersList from '../presentation/UsersList.jsx';
import PaySection from './PaySection.jsx';
import TransactionHistory from '../presentation/TransactionHistory.jsx';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            allUsers: [],
            selectedSender: null,
            selectedReceiver: null,
            senderNode: null,
            receiverNode: null,
            transactions: [],
            sendDisabled: false
        };
    }

    componentDidMount() {
        //Get current user data
        this.setState({
            user: this.props.router.location.state
        }, () => {
            const selectedUserId = this.state.user.userId;
            axios.post('/api/users/getUser', { selectedUserId }).then((user) => {
                this.setState({
                    selectedSender: user.data
                }, () => {
                    //Get all banks pertaining to current user
                    this.getBanks();
                    //Get all users for user table display
                    this.getUsers();
                });
            });
        });

    }

    findUser(selectedUserId) {
        axios.post('/api/users/getUser', { selectedUserId }).then((user) => {
            return user.data;
        });
    }

    getUsers() {
        axios.get('/api/users/getUsers').then((userData) => {
            return userData.data;
        }).then((usersArray) => {
            let allUsers = [];
            usersArray.forEach((user, index) => {
                allUsers.push({
                    name: user.legal_names[0],
                    email: user.logins[0].email,
                    phone_number: user.phone_numbers[0],
                    id: user._id
                });
            });
            this.setState({
                usersArray: usersArray,
                allUsers: allUsers
            });
        });
    }

    getBanks(receiver, switchAccount) {
        let selectedUser;
        if (receiver) {
            selectedUser = receiver;
        } else {
            selectedUser = this.state.selectedSender;
        }

        axios.post('/api/nodes/getBanks', selectedUser).then((data) => {
            return data.data.nodes;
        }).then((nodes) => {
            let node;
            if (switchAccount) {
                node = nodes[1];
            } else {
                node = nodes[0];
            }
            if (receiver) {
                this.setState({ 
                    receiverNode: node 
                }, () => {
                    this.updateSelectedNode();
                });
            } else {
                this.setState({ 
                    senderNodeId: node._id 
                }, () => {
                    this.updateSelectedNode(this.state.senderNodeId);
                });
            }
        });
    }

    updateSelectedReceiver(selectedUserId) {
        //Get user & node data of selected user from dropdown
        this.setState({
            sendDisabled: true
        });
        axios.post('/api/users/getUser', { selectedUserId }).then((user) => {
            this.setState({ 
                selectedReceiver: user.data
            }, () => {
                this.getBanks(this.state.selectedReceiver);
            });
        });
    }

    updateSelectedNode(senderNodeId) {
        let selectedUser;
        let selectedNode_id;

        if (senderNodeId) {
            selectedUser = this.state.selectedSender;
            selectedNode_id = senderNodeId;
        } else {
            selectedUser = this.state.selectedReceiver;
            selectedNode_id = this.state.receiverNode._id;
        }

        const postData = { selectedNode_id, selectedUser };
        axios.post('/api/nodes/getOneBank', postData).then((node) => {
            if (senderNodeId) {
                this.setState({ 
                    senderNode: node.data 
                }, () => {
                    //Get all transactions of current user
                    this.getTransactions();
                });
            } else {
                this.setState({ 
                    receiverNode: node.data
                }, () => { 
                    this.setState({sendDisabled: false});
                });
            }
        });
    }

    updateSenderNode(ACHNode) {
        this.setState({
            senderNode: ACHNode[0]
        }, () => {
            this.getTransactions();
        });
    }

    switchAccount() {
        const selectedUserId = this.state.user.userId;
        axios.post('/api/users/getUser', { selectedUserId }).then((user) => {
            this.setState({
                selectedSender: user.data
            }, () => {
                //Get all banks pertaining to current user
                this.getBanks(undefined, true);
                //Get all users for user table display
                this.getUsers();
            });
        });
    }

    createTransaction(amount) {
        const transactionData = {
            sender: this.state.senderNode,
            receiver: this.state.receiverNode,
            amount: amount,
        };
        axios.post('/api/transactions/createTransaction', transactionData).then((data) => {
            console.log('returned transaction data', data);
            this.getTransactions();
        })
    }

    getTransactions() {
        axios.post('/api/transactions/getTransactions', this.state.senderNode).then((data) => {
            this.setState({
                transactions: data.data.trans
            });
        });
    }

    render() {
        const createTransaction = this.createTransaction.bind(this);
        const updateSelectedReceiver = this.updateSelectedReceiver.bind(this);
        const updateSenderNode = this.updateSenderNode.bind(this);
        const switchAccount = this.switchAccount.bind(this);

        if (this.state.user &&
            this.state.allUsers &&
            this.state.senderNode) {
            return (
                <div>
                    <nav className="navbar navbar-default synapsefi-color">
                        <div className="text-color-white m-t m-l"><span>SynapseFI - Payments made by Michael Chiang</span></div>
                    </nav>
                    <div className="col-xs-12">
                        <ProfileSection user={this.state.user} />
                        <PaySection 
                            allUsers={this.state.allUsers} 
                            senderNode={this.state.senderNode} 
                            createTransaction={createTransaction} 
                            updateSelectedReceiver={updateSelectedReceiver}
                            updateSenderNode={updateSenderNode}
                            selectedSender={this.state.selectedSender} 
                            switchAccount={switchAccount}
                            sendDisabled={this.state.sendDisabled}
                        />
                        <TransactionHistory transactions={this.state.transactions} />
                        <UsersList allUsers={this.state.allUsers} />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <nav className="navbar navbar-default synapsefi-color">
                        <div className="text-color-white m-t m-l"><span>SynapseFI - Payments made by Michael Chiang</span></div>
                    </nav>
                    <div className="text-center">Loading...</div>
                </div>
            );
        }
    }
}
