const express = require('express');
const SynapsePay = require('synapsepay');
const keys = require('../../keys');
const Clients = SynapsePay.Clients;
const Helpers = SynapsePay.Helpers;
const Users = SynapsePay.Users;
const Nodes = SynapsePay.Nodes;
const Transactions = SynapsePay.Transactions;

const router = express.Router();
const client = new Clients(keys.client_id, keys.client_secret, false);
const getUserIP = Helpers.getUserIP;

router.get('/', function (req, res) {
    res.json({ message: 'Running...' });
});

// Create a User
router.post('/createUser', (req, res) => {
    console.dir(req.body);
    const createPayload = {
        logins: [
            {
                email: req.body.email,
                password: req.body.password,
                read_only: false,
            }
        ],
        phone_numbers: [req.body.phone_numbers],
        legal_names: [req.body.legal_names]
    };

    Users.create(client, keys.finger_print, getUserIP(), createPayload, function(err, response) {
        if (err) {
            console.dir(err);
        } else {
            res.send(response);
        }
    });
});

//Create a node 
router.post('/createNode', (req, res) => {
    const user = req.body.user;
    const nodePayload = {
        type: 'SYNAPSE-US',
        info: {
            nickname: req.body.nickname,
        },
        extra: {
            supp_id: '43294',
        }
    };
    Nodes.create(user, nodePayload, function(err, response) {
        if (err) {
            console.dir(err);
        } else {
            res.send(response);
        }
    });
});



module.exports = router;
