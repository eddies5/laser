var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var kue = require('kue');
var jobs = kue.createQueue();

app.use(express.logger());
app.use(express.static(__dirname));
app.use(kue.app.listen(4000));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

server.listen(3000);
console.log('Listening on port 3000');

var Stream = require('./src/stream.js')(io, jobs);
