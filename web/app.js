var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var llist = require('./doubly-linked-list.js');

var positionMap = {};
var queue = new llist();

app.use(express.logger());
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

server.listen(3000);
console.log('Listening on port 3000');

io.sockets.on('connection', function (socket) {
  console.log('socket connection made');

  positionMap[socket.id] = queue.add(socket);

  socket.on('left', function (data) {
  	console.log('left');
  });

  socket.on('right', function (data) {
  	console.log('right');
  });

  socket.on('up', function (data) {
  	console.log('up');
  });

  socket.on('down', function (data) {
  	console.log('down');
  });

  socket.on('disconnect', function () {
  	console.log('socket disconnected');
    queue.remove(positionMap[socket.id]);
    delete positionMap[socket.id];
  });
});

setInterval(function () {
  var sock;
  queue.toArray().forEach(function (sock, i) {
    console.log(sock.id);
  });
}, 1000);
