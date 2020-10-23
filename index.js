#!/usr/bin/env node

var express = require('express');
const socketIo = require("socket.io");

var app = express();

require('./routes/routes')(app);


app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(5000, function () {
  console.log('Listening to Port 5000');
});
