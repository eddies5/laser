var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.logger());

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

server.listen(3000);
console.log('Listening on port 3000');
