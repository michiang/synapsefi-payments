const express = require('express');
const SynapsePay = require('synapsepay');
const keys = require('../../keys');
const Clients = SynapsePay.Clients;
const Helpers = SynapsePay.Helpers;
const Transactions = SynapsePay.Transactions;

const router = express.Router();
const client = new Clients(keys.client_id, keys.client_secret, false);
const getUserIP = Helpers.getUserIP;


// Create a Transaction
router.post('/createTransaction', (req, res) => {
    console.log('transaction req');
    console.log(req.body);
    const payLoad = {
        to: {
            type: req.body.receiver.json.type,
            id: req.body.receiver.json._id,
        },
        amount: {
            amount: req.body.amount,
            currency: 'USD',
        },
        extra: {
            ip: getUserIP(),
        }
    };

    Transactions.create(req.body.sender, payLoad, (error, response) => {
        if (error) {
            res.send(error);
        } else {
            res.send(response);
        }
    });
});

//get transactions
router.post('/getTransactions', (req, res) => {
    const node = req.body;
    Transactions.get(node, null, (error, response) => {
        if (error) {
            res.send(error);
        } else {
            res.send(response);
        }
    });
});

module.exports = router;
