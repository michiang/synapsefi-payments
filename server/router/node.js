const express = require('express');
const SynapsePay = require('synapsepay');
const keys = require('../../keys');
const Clients = SynapsePay.Clients;
const Helpers = SynapsePay.Helpers;
const Nodes = SynapsePay.Nodes;

const router = express.Router();
const client = new Clients(keys.client_id, keys.client_secret, false);
const getUserIP = Helpers.getUserIP;

//Add synapse node
router.post('/addBank', (req, res) => {
    const user = req.body.user;
    const nodePayload = {
        type: 'SYNAPSE-US',
        info: {
            nickname: req.body.nickname,
        }
    };
    Nodes.create(user, nodePayload, (err, response) => {
        if (err) {
            console.dir(err);
        } else {
            res.send(response);
        }
    });
});

// Get banks
router.post('/getBanks', (req, res) => {
    const user = req.body;
    Nodes.get(user, null, (error, response) => {
        res.send(response);
    });
});

//Get one bank
router.post('/getOneBank', (req, res) => {
    console.log('get one bank');
    console.log(req.body);
    const user = req.body.selectedUser;
    const node_id = req.body.selectedNode_id;
    Nodes.get(user, {
        _id: node_id,
        full_dehydrate: 'yes', // optional
    },
        (err, nodeResponse) => {
            // error or node object
            res.send(nodeResponse);
        }
    );
});

router.post('/create_ACH_US_Node', (req, res) => {
    console.log(req.body);
    const achPayload = {
        type: 'ACH-US',
        info: {
            nickname: 'Node Library Checking Account',
            name_on_account: 'Node Library',
            account_num: '72347235423',
            routing_num: '051000017',
            type: 'PERSONAL',
            class: 'CHECKING',
        },
        extra: {
            supp_id: '123sa',
        },
    };
    const user = req.body;
    Nodes.create(user, achPayload, (err, nodeResponse1) => {
        const microPayload = {
            micro: [0.5, 0.5]
        };
        var nodes = nodeResponse1;
        var node = nodes[0];
        node.update(
            microPayload,
            (err, nodeResponse2) => {
                // error or node object
                node = nodeResponse2;
                res.send(nodeResponse2);
            }
        );
        node.resendMicro(
            (err, nodeResponse3) => {
                // error or node object
                node = nodeResponse3;
            }
        );
        res.send(nodeResponse1);
    });
});

module.exports = router;
