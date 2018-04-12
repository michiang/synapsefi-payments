const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('./router/user');
const node = require('./router/node');
const transaction = require('./router/transaction');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

app.use('/api/users', user);
app.use('/api/nodes', node);
app.use('/api/transactions', transaction);

const port = 8081;

app.listen(port, () => {
    console.log(`Listening on port ${port}:`);
});
