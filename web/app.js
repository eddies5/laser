var express = require('express');
var app = express();
var server = require('http').createServer(app);
//var io = require('socket.io').listen(server);
//var kue = require('kue');
//var jobs = kue.createQueue();


app.use(express.logger());
app.use(express.static(__dirname));

/*
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});*/

app.get('/', function (req, res) {
  res.send("HELLO");
});

//kue.app.listen(3000);
server.listen(80);

//console.log('Running: ' + app.get('env'));
//console.log('Laser listening on port 80');
//console.log('Kue listening on port 3000');

//var Stream = require('./src/stream.js')(io, jobs);

