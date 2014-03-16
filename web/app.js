var config = require('../config');

var fs = require('fs');
var _ = require('underscore');

// insert correct urls into client code
fs.readFile('./index.tmpl', 'utf8', function (err, data) {
	if (err) throw err;
	var compiled = _.template(data);
	var indexHTML = compiled({
		streamServer: 'ws://' + config.streamServer.host + ":" + config.webSocket.port
	});

	fs.writeFile('index.html', indexHTML, function (err) {
		if (err) throw err;
		console.log("index.html written");
	});
});

fs.readFile('./controls.tmpl', 'utf8', function (err, data) {
	if (err) throw err;
	var compiled = _.template(data);
	var controlsJS = compiled({
		appServer: 'http://' + config.appServer.host + ":" + config.appServer.port
	});

	fs.writeFile('controls.js', controlsJS, function (err) {
		if (err) throw err;
		console.log("controls.js written");
	});
});

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

if ('production' == process.env.NODE_ENV) {
	var STREAM_SECRET = "secret",
		STREAM_PORT = config.streamServer.port,
		WEBSOCKET_PORT = config.webSocket.port,
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
		width = (240)|0;
		height = (160)|0;

		console.log(
			'Stream Connected: ' + request.socket.remoteAddress +
			':' + request.socket.remotePort + ' size: ' + width + 'x' + height
		);

		request.on('data', function(data){
			socketServer.broadcast(data, {binary:true});
		});

	}).listen(STREAM_PORT);
}


kue.app.listen(config.kuePort);
server.listen(config.appServer.port);

console.log('Running: ' + app.get('env'));
console.log('Laser listening on port: ' + config.appServer.port);
console.log('Kue listening on port: ' + config.kuePort);

var Stream = require('./src/stream.js')(io, jobs);
