const express = require('express');
const SynapsePay = require('synapsepay');
const keys = require('../../keys');
const Clients = SynapsePay.Clients;
const Helpers = SynapsePay.Helpers;
const Users = SynapsePay.Users;

const router = express.Router();
const client = new Clients(keys.client_id, keys.client_secret, false);
const getUserIP = Helpers.getUserIP;

router.get('/', function (req, res) {
    res.json({ message: 'Running...' });
});

// Create a User
router.post('/createUser', (req, res) => {
    const createPayload = {
        logins: [
            {
                email: req.body.email,
                password: req.body.password,
                read_only: false,
            }
        ],
        phone_numbers: [
            req.body.phone_numbers
        ],
        legal_names: [
            req.body.legal_names
        ]
    };

    Users.create(client, keys.finger_print, getUserIP(), createPayload, (err, response) => {
        if (err) {
            console.dir(err);
        } else {
            res.send(response);
        }
    });
});

//Get users
router.get('/getUsers', (req, res) => {
    const options = {
        ip_address: getUserIP(),
        page: '',
        per_page: '',
        query: ''
    };
    Users.get(client, options, (err, response) => {
        res.send(response.users);
    });
});

//Get user
router.post('/getUser', (req, res) => {
    const selectedUserId = req.body.selectedUserId;
    const options = {
        _id: selectedUserId,
        fingerprint: keys.finger_print,
        ip_address: getUserIP()
    };

    Users.get(client, options, (err, response) => {
        res.send(response);
    });
});

module.exports = router;
