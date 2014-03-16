
var config = require('../config');

if ('production' == process.env.NODE_ENV) {
	var SerialPort = require('serialport').SerialPort;
	var serialPort = new SerialPort(config.arduinoSerialPort, {
		baudrate: 9600
	});
}

var io = require('socket.io-client');

var socket = io.connect('http://' + config.appServer.host + ':' + config.appServer.port);

socket.emit('arduino');

(function (socket) {

	socket.on('arduinoRight', function (data) {
		console.log('right');

		serialPort.write("0", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});
		serialPort.write("5", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});

	});

	socket.on('arduinoLeft', function (data) {
		console.log('left');

		serialPort.write("0", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});
		serialPort.write("4", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});

	});

	socket.on('arduinoUp', function (data) {
		console.log('up');

		serialPort.write("1", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});
		serialPort.write("3", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});

	});

	socket.on('arduinoDown', function (data) {
		console.log('down');

		serialPort.write("1", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});
		serialPort.write("2", function (err, results) {
			console.log('err: ' + err);
			console.log('results: ' + results);
		});

	});
})(socket);
