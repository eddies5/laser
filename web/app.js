var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var kue = require('kue');
var jobs = kue.createQueue();

app.use(express.logger());
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

kue.app.listen(3000);
server.listen(4000);
console.log('Laser listening on port 3000');
console.log('Kue listening on port 4000');

var Stream = require('./src/stream.js')(io, jobs);
