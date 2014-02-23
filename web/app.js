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


var STREAM_SECRET = "secret",
	STREAM_PORT = process.argv[3] || 3075,
	WEBSOCKET_PORT = process.argv[4] || 3050,
	STREAM_MAGIC_BYTES = 'jsmp'; // Must be 4 bytes

var width = 320,
	height = 240;

// Websocket Server
var socketServer = new (require('ws').Server)({port: WEBSOCKET_PORT});

socketServer.on('connection', function(socket) {
	// Send magic bytes and video size to the newly connected socket
	// struct { char magic[4]; unsigned short width, height;}
	var streamHeader = new Buffer(8);
	streamHeader.write(STREAM_MAGIC_BYTES);
	streamHeader.writeUInt16BE(width, 4);
	streamHeader.writeUInt16BE(height, 6);
	socket.send(streamHeader, {binary:true});

	console.log( 'New WebSocket Connection ('+socketServer.clients.length+' total)' );

	socket.on('close', function(code, message){
		console.log( 'Disconnected WebSocket ('+socketServer.clients.length+' total)' );
	});
});

socketServer.broadcast = function(data, opts) {
	for( var i in this.clients ) {
		this.clients[i].send(data, opts);
	}
};


// HTTP Server to accept incomming MPEG Stream
var streamServer = require('http').createServer( function(request, response) {
	var params = request.url.substr(1).split('/');
	width = (320)|0;
	height = (240)|0;

	console.log(
		'Stream Connected: ' + request.socket.remoteAddress + 
		':' + request.socket.remotePort + ' size: ' + width + 'x' + height
	);

	request.on('data', function(data){
		socketServer.broadcast(data, {binary:true});
	});

}).listen(STREAM_PORT);


kue.app.listen(3000);
server.listen(80);

console.log('Running: ' + app.get('env'));
console.log('Laser listening on port 80');
console.log('Kue listening on port 3000');

var Stream = require('./src/stream.js')(io, jobs);

