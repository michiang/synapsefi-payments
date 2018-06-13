const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

const port = 8081;

app.listen(port, () => {
    console.log(`Listening on port ${port}:`);
});
